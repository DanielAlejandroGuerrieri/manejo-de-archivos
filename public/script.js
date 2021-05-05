const $submit = document.getElementById("name");
const $inputFile = document.getElementById("file");
const $imgRender = document.getElementById("renderFile");
const $form = document.querySelector("form");
const $divRender = document.getElementById('render');


$inputFile.addEventListener("change", () => {
    const formData = new FormData($form);
    const data = formData.get('file')
    const typeFile = data.type;

    const file = URL.createObjectURL(data);

    console.log(file);
    console.log(typeFile)

    if (typeFile == "application/pdf") {
        $divRender.innerHTML = '';
        const $h3 = document.createElement('h3');
        $h3.textContent = data.name;
        const $embed = document.createElement('embed');
        $embed.type = 'application/pdf';
        $embed.src = file;
        $divRender.appendChild($h3);
        $divRender.appendChild($embed);
    } else {
        $divRender.innerHTML = '';
        const $h3 = document.createElement('h3');
        $h3.textContent = data.name;

        const $img = document.createElement('img');
        $img.type = typeFile;
        $img.src = file;
        $divRender.appendChild($h3);
        $divRender.appendChild($img);
    }
});

$form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    fetch('/archivo', {
        method: 'POST',
        body: formData,
    });
})