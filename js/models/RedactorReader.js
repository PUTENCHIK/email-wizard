/**
 * Специальный класс для "вырезания" письма из DOM-структуры
 */

class RedactorReader {
    static createMainTable() {
        let table = document.createElement("table");
        table.id = "mainTable";
        table.className = "mainTable table-600";
        table.cellPadding = "0";
        table.cellSpacing = "0";
        table.style.width = "600";
        table.align = "center";
        let tbody = document.createElement("tbody");
        let tr_header = document.createElement("tr");
        tr_header.className = "header";
        tr_header.id = "header";
        let tr_main = document.createElement("tr");
        tr_main.className = "main";
        tr_main.id = "main";
        let tr_footer = document.createElement("tr");
        tr_footer.className = "footer";
        tr_footer.id = "footer";

        tbody.append(tr_header);
        tbody.append(tr_main);
        tbody.append(tr_footer);
        table.append(tbody);

        return table;
    }

    static readLetterContent() {
        let templates = document.getElementsByClassName("mainTable")[0].getElementsByClassName("template");
        let table = RedactorReader.createMainTable();
        let blocks = ["header", "main", "footer"];
        for (let i = 0; i < templates.length; i++) {
            for (let j = 0; j < blocks.length; j++) {
                if (templates[i].className.includes(blocks[j])) {
                    let cell = document.createElement("td");
                    let block = table.getElementsByClassName(blocks[j])[0];
                    cell.innerHTML = templates[i].outerHTML;
                    block.append(cell);
                }
            }
        }
        for (let j = 0; j < blocks.length; j++) {
            let block = table.getElementsByClassName(blocks[j])[0]
            if (block.children.length === 0) {
                block.remove();
            }
        }
        table.classList.add("from-storage");
        return table.outerHTML;
    }
}