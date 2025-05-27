var currentPage = 1;
var linksPerPage = 10;
var links = [
    { text: "My portfolio", url: "https://nitinjangir013.github.io/myportfolio" },
    { text: "Portfolio", url: "https://nitinjangir013.github.io/portfolio" },
    { text: "iPhone Music Player Web App", url: "https://nitinjangir013.github.io/iPhone-Music-Player-Web-App" },
    { text: "Auto fill address", url: "https://nitinjangir013.github.io/auto-fill-address" },
    { text: "Inject Map Image", url: "https://nitinjangir013.github.io/inject-map" },
    { text: "3D-Christmas-Tree", url: "https://nitinjangir013.github.io/3D-Christmas-Tree" },
    { text: "Calculator", url: "https://nitinjangir013.github.io/Calculator" }
];

function displayLinks(page) {
    var startIndex = (page - 1) * linksPerPage;
    var endIndex = startIndex + linksPerPage;
    var visibleLinks = links.slice(startIndex, endIndex);

    var linksList = document.getElementById('linksList');
    linksList.innerHTML = '';

    visibleLinks.forEach(function(link) {
        var a = document.createElement('a');
        a.setAttribute('href', link.url);
        a.setAttribute('class', 'list-group-item list-group-item-action');
        a.textContent = link.text;
        linksList.appendChild(a);
    });
}

function setupPagination() {
    var totalPages = Math.ceil(links.length / linksPerPage);
    var paginationLinks = document.getElementById('paginationLinks');
    paginationLinks.innerHTML = '';

    var maxPagesToShow = 5;
    var startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    var endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // First button
    var firstLi = document.createElement('li');
    firstLi.setAttribute('class', 'page-item');
    var firstLink = document.createElement('a');
    firstLink.setAttribute('class', 'page-link');
    firstLink.textContent = 'First';
    firstLink.onclick = function() {
        currentPage = 1;
        displayLinks(currentPage);
        setupPagination();
    };
    firstLi.appendChild(firstLink);
    paginationLinks.appendChild(firstLi);

    // Previous button
    var previousLi = document.createElement('li');
    previousLi.setAttribute('class', 'page-item');
    var previousLink = document.createElement('a');
    previousLink.setAttribute('class', 'page-link');
    previousLink.textContent = 'Previous';
    previousLink.onclick = function() {
        if (currentPage > 1) {
            currentPage--;
            displayLinks(currentPage);
            setupPagination();
        }
    };
    previousLi.appendChild(previousLink);
    paginationLinks.appendChild(previousLi);

    // Ellipsis before
    if (startPage > 1) {
        var ellipsisBefore = document.createElement('li');
        ellipsisBefore.setAttribute('class', 'page-item');
        var spanBefore = document.createElement('span');
        spanBefore.setAttribute('class', 'page-link');
        spanBefore.textContent = '...';
        ellipsisBefore.appendChild(spanBefore);
        paginationLinks.appendChild(ellipsisBefore);
    }

    for (var i = startPage; i <= endPage; i++) {
        var li = document.createElement('li');
        li.setAttribute('class', 'page-item');
        if (i === currentPage) {
            li.classList.add('active');
        }
        var a = document.createElement('a');
        a.setAttribute('class', 'page-link');
        a.textContent = i;
        a.onclick = function() {
            currentPage = parseInt(this.textContent);
            displayLinks(currentPage);
            setupPagination();
        };
        li.appendChild(a);
        paginationLinks.appendChild(li);
    }

    // Ellipsis after
    if (endPage < totalPages) {
        var ellipsisAfter = document.createElement('li');
        ellipsisAfter.setAttribute('class', 'page-item');
        var spanAfter = document.createElement('span');
        spanAfter.setAttribute('class', 'page-link');
        spanAfter.textContent = '...';
        ellipsisAfter.appendChild(spanAfter);
        paginationLinks.appendChild(ellipsisAfter);
    }

    // Next button
    var nextLi = document.createElement('li');
    nextLi.setAttribute('class', 'page-item');
    var nextLink = document.createElement('a');
    nextLink.setAttribute('class', 'page-link');
    nextLink.textContent = 'Next';
    nextLink.onclick = function() {
        if (currentPage < totalPages) {
            currentPage++;
            displayLinks(currentPage);
            setupPagination();
        }
    };
    nextLi.appendChild(nextLink);
    paginationLinks.appendChild(nextLi);

    // Last button
    var lastLi = document.createElement('li');
    lastLi.setAttribute('class', 'page-item');
    var lastLink = document.createElement('a');
    lastLink.setAttribute('class', 'page-link');
    lastLink.textContent = 'Last';
    lastLink.onclick = function() {
        currentPage = totalPages;
        displayLinks(currentPage);
        setupPagination();
    };
    lastLi.appendChild(lastLink);
    paginationLinks.appendChild(lastLi);
}

function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('linksList');
    li = ul.getElementsByTagName('a');

    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

displayLinks(currentPage);
setupPagination();