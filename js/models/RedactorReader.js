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
        table.style.width = "600px";
        table.align = "center";
        let tbody = document.createElement("tbody");
        let tr_header = document.createElement("tr");
        tr_header.className = "header";
        tr_header.id = "header";
        let tr_main = document.createElement("tr");
        let td = document.createElement("td");
        let main_table = document.createElement("table");
        main_table.className = "main";
        main_table.id = "main";

        let tr_footer = document.createElement("tr");
        tr_footer.className = "footer";
        tr_footer.id = "footer";

        td.append(main_table);
        tr_main.append(td);

        tbody.append(tr_header);
        tbody.append(tr_main);
        tbody.append(tr_footer);
        table.append(tbody);

        return table;
    }

    static readLetterContent() {
        let templates = document.getElementsByClassName("mainTable")[0].getElementsByClassName("template");
        // console.log(templates);
        let table = RedactorReader.createMainTable();
        // console.log("own table:", table);

        let blocks = ["header", "main", "footer"];
        for (let i = 0; i < templates.length; i++) {
            for (let j = 0; j < blocks.length; j++) {
                if (templates[i].className.includes(blocks[j])) {
                    let block = table.getElementsByClassName(blocks[j])[0];

                    if (templates[i].className.includes("main")) {
                        let td = document.createElement("td");
                        let tr = document.createElement("tr");
                        td.append(templates[i].cloneNode(true));
                        tr.append(td);

                        block.append(tr);
                    }
                    else {
                        let td = document.createElement("td");
                        td.append(templates[i].cloneNode(true));

                        block.append(td);
                    }
                    break;
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

        console.log(table);
        console.log(table.outerHTML);
        return table.outerHTML;
    }
}