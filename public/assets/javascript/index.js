$(document).ready(function() {
    var containterToStoreArticle = $(".article-container");
    $(document).on("click", ".btn.save", articleSave);
    $(document).on("click", ".btn.scrape-new", articleScrape);
    $(".clear").on("click", articleClear);

    // === Running an AJAX request for unsaved headlines ===
    // === If there are headlines, we post them to the page ===
    // === If no headlines, then render message notifying user of no headlines ===
    function page() {
        $.get("/api/headlines?saved=false").then(function(data) {
            containterToStoreArticle.empty();
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    }

    // === Appending the html contained in our data to the page ===
    // === Passing the data for each article into a JSON array ===
    function renderArticles(articles) {
        var cardForArticles = [];
        for (var i = 0; i < articles.length; i++) {
            cardForArticles.push(createCard(articles[i]));
        }
    }
    // === Creating a function that will take a JSON object for an artile and appending it to the card ===
    function createCard(article) {
        var card = $("<div class='card'>");
        var cardHeader = $("<div class='card-header'>").append (
            $("a").append (
                $("<a class='article-link target='_blank' rel=noopener noreferrer'>")
                .attr("href", article.url)
                .text(article.headline),
            $("<a class='btn btn-primary save'>Save Article</a>")
            )
        );

        var cardBody = $("<div class='card-body'>").text(article.summary);
                // === Taking the article's id an attaching it to the element ===
        card.append(cardHeader, cardBody);
        card.data("_id", article._id);
        return card;
    }

    // === Function that will save a desired article ===
    function articleSave() {
        var savingArticle = $(this)
            .parent(".card")
            .data();
        $(this)
            .parent(".card")
            .remove();
        
        savingArticle.save = true;
        $.ajax({
            method: "PUT",
            url: "/api/headlines/" + savingArticle._id,
            data: articleSave
        }).then(function() {
            if(data.saved) {
                page();
            }
        });
    }

    // === Function to scrape articles from WSJ ===
    function articleScrape() {
        $.get("/api/fetch")
            .then(function(data) {
                page();
            });
    }

    function articleClear() {
        $.get("/api/clear")
        .then(function(){
            containterToStoreArticle.empty();
            page();
        });
    }
  
});