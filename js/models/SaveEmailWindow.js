/**
 * Окно подтверждения сохранения письма
 */
class SaveEmailWindow extends FixedWindow {
    constructor() {
        super("Сохранение письма");
        this.window.classList.add("modal-save");

        this.info_block = SaveEmailWindow.createTextBlock("Вы уверены, что хотите сохранить письмо в данном виде " +
            "без возможности вернуть изменения?");

        this.button_cancel = SaveEmailWindow.createButton("Отмена", "button-cancel");
        this.button_cancel.addEventListener("click", () => {
            this.closeWindow();
        });

        this.button_confirm = SaveEmailWindow.createButton("Да", "button-yes", false, true);
        this.button_confirm.addEventListener("click", () => {
            let letter_html = RedactorReader.readLetterContent();
            MyLocalStorage.set_html_current_letter(letter_html);
            this.closeWindow();
        });

        this.window.append(this.info_block);
        this.buttons_group.append(this.button_cancel);
        this.buttons_group.append(this.button_confirm);
        this.window.append(this.buttons_group);
    }
}