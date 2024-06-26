/**
 * Класс окна для отправки письма на указанную почту с указанной темой
 */
class SendEmailWindow extends FixedWindow {
    constructor() {
        super("Отправить письмо");
        this.window.classList.add("window-send-email");

        this.enterReceiver = SendEmailWindow.createInput(
            "Введите почту получателя:",
            "form-text",
            "email",
            "receiver",
            "example@outlook.ru"
        );
        this.enterTheme = SendEmailWindow.createInput(
            "Введите тему письма:",
            "form-text",
            "text",
            "theme",
            "Приглашение на конференцию"
        );

        this.window.append(this.enterReceiver);
        this.window.append(this.enterTheme);

        this.button_cancel = SendEmailWindow.createButton("Отмена", "button-cancel", false);
        this.button_cancel.addEventListener("click", () => {
            this.container.remove();
        });

        this.button_send = SendEmailWindow.createButton("Отправить", "button-true-send", true);
        this.button_send.addEventListener("click", () => {
            let emailIsValid = true;
            let receiver = this.getInputValue("receiver");
            if (! receiver) {
                this.showErrorBlock("receiver");
                this.setErrorBlockText("receiver", "Вы не ввели почту получателя письма");
            } else if (! /^[a-z\d\-]+@(gmail|mail|outlook|yandex)\.(ru|com)$/iu.test(receiver)) {
                this.showErrorBlock("receiver");
                this.setErrorBlockText("receiver", "Введённое значение не является адресом почты");
                emailIsValid = false;
            } else {
                this.hideErrorBlock("receiver");
            }

            let theme = this.getInputValue("theme");
            if (! theme) {
                this.showErrorBlock("theme");
                this.setErrorBlockText("theme", "Вы не ввели тему письма");
            } else {
                this.hideErrorBlock("theme");
            }

            if (emailIsValid && theme && receiver) {
                EmailSender.sendEmail(theme, receiver);
                this.closeWindow();
            }
        });

        this.buttons_group.append(this.button_cancel);
        this.buttons_group.append(this.button_send);
        this.window.append(this.buttons_group);
    }
}