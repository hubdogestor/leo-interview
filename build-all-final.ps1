# Script final para gerar builds das 4 versoes usando worktrees
# Executa: .\build-all-final.ps1

Write-Host "Iniciando build das versoes..." -ForegroundColor Green

# Lista de commits dos backups
$commits = @("424b7a87", "c69804bc", "2d26dc53", "a16b474d")

# Cria pasta dist se nao existir
if (-not (Test-Path "dist")) {
    New-Item -Path "dist" -ItemType Directory -Force | Out-Null
}

# Salva a posicao atual
$originalLocation = Get-Location

foreach ($commit in $commits) {
    Write-Host "`nConstruindo versao para commit $commit..." -ForegroundColor Cyan

    # Cria um worktree temporario para este commit
    $worktreePath = "worktree-$commit"

    # Remove worktree se ja existir
    if (Test-Path $worktreePath) {
        Remove-Item -Path $worktreePath -Recurse -Force
    }

    # Cria o worktree
    Write-Host "Criando worktree temporario..." -ForegroundColor Yellow
    git worktree add $worktreePath $commit 2>&1 | Out-Null

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro ao criar worktree para $commit"
        continue
    }

    # Vai para o worktree
    Set-Location $worktreePath

    # Instala dependencias
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    pnpm install 2>&1 | Out-Null

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro ao instalar dependencias para $commit"
        Set-Location $originalLocation
        git worktree remove $worktreePath --force
        continue
    }

    # Gera build
    Write-Host "Gerando build..." -ForegroundColor Yellow
    pnpm run build

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro ao gerar build para $commit"
        Set-Location $originalLocation
        git worktree remove $worktreePath --force
        continue
    }

    # Volta para a raiz
    Set-Location $originalLocation

    # Cria a subpasta no dist final
    $targetDir = "dist\$commit"
    if (Test-Path $targetDir) {
        Remove-Item -Path $targetDir -Recurse -Force
    }
    New-Item -Path $targetDir -ItemType Directory -Force | Out-Null

    # Copia os arquivos do build
    Write-Host "Copiando arquivos para dist\$commit..." -ForegroundColor Yellow

    if (Test-Path "$worktreePath\dist\index.html") {
        Copy-Item -Path "$worktreePath\dist\*" -Destination $targetDir -Recurse -Force
    }

    # Remove o worktree
    git worktree remove $worktreePath --force 2>&1 | Out-Null

    Write-Host "Build de $commit concluido!" -ForegroundColor Green
}

# Lista o conteudo final da pasta dist
Write-Host "`nConteudo final da pasta dist:" -ForegroundColor Cyan
Get-ChildItem -Path "dist" -Directory | ForEach-Object {
    $fileCount = (Get-ChildItem -Path $_.FullName -Recurse -File).Count
    Write-Host "  $($_.Name) ($fileCount arquivos)" -ForegroundColor Gray
}

Write-Host "`nProcesso concluido!" -ForegroundColor Green
Write-Host "`nPara fazer deploy, execute:" -ForegroundColor Yellow
Write-Host "  git add dist" -ForegroundColor Blue
Write-Host "  git commit -m 'chore: add all 4 version builds'" -ForegroundColor Blue
Write-Host "  git push origin master" -ForegroundColor Blue
