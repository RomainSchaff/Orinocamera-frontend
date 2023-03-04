const main = document.querySelector("main");

main.innerHTML = `
<div id="container-confirmation">
<p> Le numéro de la commande est : ${localStorage.orderId}</p>
<br>
<p> Prix total : ${localStorage.total}€</p>
<iframe src="https://giphy.com/embed/IwAZ6dvvvaTtdI8SD5" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>
<a href="https://giphy.com/gifs/theoffice-the-office-tv-michaels-birthday-IwAZ6dvvvaTtdI8SD5">via GIPHY</a></p>
</div>
`;
