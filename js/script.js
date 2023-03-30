// Seleciona todas as colunas
const columns = document.querySelectorAll(".column");

// Adiciona o evento de arrastar ao iniciar
document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});

// Adiciona o evento de arrastar ao finalizar
document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
});

// Percorre todas as colunas
columns.forEach((item) => {
    // Adiciona o evento de arrastar sobre a coluna
    item.addEventListener("dragover", (e) => {
        // Seleciona o elemento arrastado
        const dragging = document.querySelector(".dragging");

        // Obtém a nova posição para inserir o elemento arrastado
        const applyAfter = getNewPosition(item, e.clientY);

        // Insere o elemento arrastado na nova posição
        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            item.prepend(dragging);
        }

    });
});

// Obtém a nova posição para inserir o elemento arrastado
function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".item:not(.dragging)");
    let result;

    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if (posY >= boxCenterY) result = refer_card;
    }

    return result;
}