window.addEventListener("DOMContentLoaded", () => {

    function getMain() {
        return document.getElementsByTagName("main")[0];
    }

    try {
        MyLocalStorage.create();
    } catch {
        //
    }
    EmailSender.uploadLetterTemplate();

    let btn_myemails = document.getElementsByClassName("button-myemails")[0];

    btn_myemails.addEventListener("click", () => {
        MyLocalStorage.set_current_letter(null);
        window.location.href = "myemails.html";
    });

    let letter_name = document.getElementsByClassName("letter-name")[0];
    letter_name.textContent = MyLocalStorage.get_current_letter()['title'];

    let btn_save = document.getElementsByClassName("button-save")[0];
    btn_save.addEventListener("click", () => {
        let save_window = new SaveEmailWindow().render();
        getMain().append(save_window);
    });

    let btn_send = document.getElementsByClassName("button-send")[0];
    btn_send.addEventListener("click", () => {
        let send_window = new SendEmailWindow().render();
        getMain().append(send_window);
    });
});