$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});

const getMovies = searchText => {
    //request api
    axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=7041ca32')
        .then((res) => {
            console.log(res);
            let movies = res.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center my-4">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                        </div>
                    </div>
                `
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err)
        })
}

function movieSelected(id) {
    console.log(id)
    sessionStorage.setItem('imdbID', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

        //request api
        axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=7041ca32')
            .then((res) => {
                console.log(res);
                let movies = res.data.Search;
                let output = '';
                $.each(movies, (index, movie) => {
                    output += `
                        <div class="col-md-3">
                            <div class="well text-center my-4">
                                <img src="${movie.Poster}">
                                <h5>${movie.Title}</h5>
                                <a onlcick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="movie.html">Movie Detail</a>
                            </div>
                        </div>
                    `
                });
    
                $('#movies').html(output);
            })
            .catch((err) => {
                console.log(err)
            })
}