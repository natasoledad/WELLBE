# Welbe: regras do repositório

App do paciente (React, Vite, PWA), protótipo com dados simulados. Fica fora da plataforma GADE (produto para o Chile, ligado ao Higia). Conversa e commits em português do Brasil.

## Início de cada sessão (obrigatório)

1. **Antes de qualquer tarefa, pergunte:** "Já finalizamos a conversa anterior? Tem o print da atualização dessas modificações no servidor?"
2. **Só avance** com um "sim", ou quando chegar o print mostrando que a última versão do GitHub está no servidor. Se a resposta for não, ajude primeiro a concluir a atualização pendente.
3. **Leia os registros, não a conversa:** este arquivo e o `README.md`. Resuma em poucas linhas o estado e o que está pendente, e então siga.
4. **Ao terminar**, registre no `README.md` o que foi feito e o que falta.

## Infraestrutura (regra da Natalia, vale para todos os projetos de natasoledad e saulobatistela)

1. **Não gastar minutos do GitHub Actions** (2.000 min/mês para todos os projetos juntos). Este repositório não tem workflows; não criar workflows de build, teste ou deploy no GitHub. Se algum dia precisar de um, só com `on: workflow_dispatch` (manual).
2. **Todo o processamento é feito no VPS.** São dois Droplets iguais da DigitalOcean (~2 GB de RAM): GADEAPP e Higia. A compilação (`docker compose build` no próprio servidor), os testes e a implantação acontecem lá. Ainda não há clientes ativos: tudo bem os outros sistemas ficarem lentos durante uma compilação.
3. **Deploy pelo servidor:** quando o Welbe for publicado, o servidor baixa o código (`git pull` com uma deploy key só de leitura) e compila ali, com um script de atualização. Nada de imagem montada no Actions, registry ou SSH a partir do Actions.
