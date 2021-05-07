const $submit = document.getElementById("name");
const $inputFile = document.getElementById("file");
const $imgRender = document.getElementById("renderFile");
const $form = document.querySelector("form");
const $divRender = document.getElementById('render');

const renderFilesAttachments = (data) => {
    const typeFile = data.type;
    const file = URL.createObjectURL(data);

    if (typeFile == "application/pdf") {
        const $h3 = document.createElement('h3');
        $h3.textContent = data.name;
        const $embed = document.createElement('embed');
        $embed.type = 'application/pdf';
        $embed.src = file;
        $divRender.appendChild($h3);
        $divRender.appendChild($embed);
    } else {
        const $h3 = document.createElement('h3');
        $h3.textContent = data.name;

        const $img = document.createElement('img');
        $img.type = typeFile;
        $img.src = file;
        $divRender.appendChild($h3);
        $divRender.appendChild($img);
    }
}

$inputFile.addEventListener("change", () => {
    const formData = new FormData($form);

    $divRender.innerHTML = '';
    const data = formData.getAll('file');
    data.forEach((data) => renderFilesAttachments(data));


});

$form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    fetch('/archivo', {
        method: 'POST',
        body: formData,
    });
    $divRender.innerHTML = '';
    //agregar limite de envios de 25mb y la respuesta del server
})