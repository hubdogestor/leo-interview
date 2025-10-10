# Script para gerar builds das 4 versoes do leo-interview
# Executa: .\build-versions.ps1

Write-Host "Iniciando build das versoes..." -ForegroundColor Green

# Lista de commits dos backups
$commits = @("424b7a87", "c69804bc", "2d26dc53", "a16b474d")

# Garante que estamos no master antes de comecar
git checkout master
if ($LASTEXITCODE -ne 0) {
    Write-Error "Erro ao fazer checkout do master"
    exit 1
}

# Limpa dist inicial
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "Limpou pasta dist inicial" -ForegroundColor Yellow

# Cria pasta dist principal
New-Item -Path "dist" -ItemType Directory -Force

foreach ($commit in $commits) {
    Write-Host "Construindo versao para commit $commit..." -ForegroundColor Cyan

    # Faz checkout do commit
    git checkout $commit
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro no git checkout $commit"
        break
    }

    # Limpa node_modules e dist para evitar conflitos
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue

    # Instala dependencias
    Write-Host "Instalando dependencias para $commit..." -ForegroundColor Yellow
    pnpm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro ao instalar dependencias para $commit"
        break
    }

    # Gera build
    Write-Host "Gerando build para $commit..." -ForegroundColor Yellow
    pnpm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro ao gerar build para $commit"
        break
    }

    # Volta para master para salvar o build
    git checkout master

    # Cria a subpasta com o nome do commit
    $targetDir = "dist\$commit"
    New-Item -Path $targetDir -ItemType Directory -Force

    # Volta para o commit para copiar os arquivos
    git checkout $commit

    # Copia os arquivos do build para a subpasta no master
    if (Test-Path "dist\index.html") {
        Copy-Item -Path "dist\index.html" -Destination "dist\$commit\index.html" -Force
    }
    if (Test-Path "dist\favicon.ico") {
        Copy-Item -Path "dist\favicon.ico" -Destination "dist\$commit\favicon.ico" -Force
    }
    if (Test-Path "dist\assets") {
        Copy-Item -Path "dist\assets" -Destination "dist\$commit\assets" -Recurse -Force
    }

    Write-Host "Build de $commit concluido!" -ForegroundColor Green
}

# Volta para o branch master
Write-Host "Voltando para branch master..." -ForegroundColor Cyan
git checkout master

# Lista o conteudo final da pasta dist
Write-Host "Conteudo final da pasta dist:" -ForegroundColor Cyan
Get-ChildItem -Path "dist" -Recurse | ForEach-Object {
    Write-Host "  $($_.FullName.Replace((Get-Location).Path + '\', ''))" -ForegroundColor Gray
}

# Adiciona, commita e faz push
Write-Host "Fazendo commit e push das versoes..." -ForegroundColor Cyan
git add -f dist
git add -f .
git commit -m "feat: add all 4 version builds for multi-version Pages deployment"
git push origin master

Write-Host "Processo concluido! Aguarde o deploy do GitHub Pages." -ForegroundColor Green
Write-Host "Em alguns minutos, teste as URLs:" -ForegroundColor Yellow
Write-Host "   https://hubdogestor.github.io/leo-interview/424b7a87/" -ForegroundColor Blue
Write-Host "   https://hubdogestor.github.io/leo-interview/c69804bc/" -ForegroundColor Blue
Write-Host "   https://hubdogestor.github.io/leo-interview/2d26dc53/" -ForegroundColor Blue
Write-Host "   https://hubdogestor.github.io/leo-interview/a16b474d/" -ForegroundColor Blue
