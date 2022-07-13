const d = document,
    $main = d.querySelector("main"),
    $links = d.querySelector(".links");
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/"

async function loadPokemons(url){
    try {
        $main.innerHTML = `<div class="loader"> <img src="./src/img/pikachu-run.gif" alt="Cargando..."> <br>
                            <p class="loading">Cargando...</p></div>`;
        let res = await fetch(url),
        json = await res.json(),
        $template = "",
        $prevLink,
        $nextLink; 

       // console.log(json)
       if (!res.ok) throw {status: res.status, statusText: statusText}

       for (let i = 0; i < json.results.length; i++){
           console.log(json.results[i])
         try {
             let res = await fetch(json.results[i].url),
             pokemon = await res.json()

          //  console.log(res,pokemon) //info de cada uno de los pokemon
          if (!res.ok) throw {status: res.status, statusText: statusText}
          $template += `<div class="card">
          <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
          <div class="name_card"><h3>${pokemon.name}</h3><span>${pokemon.stats[0].base_stat} HP</span> </div>
          <div class="stats"> </div>
          </div>`

         } catch (err) {
            console.log(err)
            let message = err.statusText || "Ocurrió un error";
            $template += `<div>
                <h3>Error ${err.status}: ${message}</h3>
            </div>`
         }
       }

       $main.innerHTML = $template;
       $prevLink = json.previous ? `<a href="${json.previous}">&laquo; Anterior</a>`: "";
       $nextLink = json.next ? `<a href="${json.next}">Siguiente &raquo;</a>`: "";
       $links.innerHTML = $prevLink + "" + $nextLink;


    } catch (err) {
        console.log(err)
        let message = err.statusText || "Ocurrió un error";
        $main.innerHTML = `<p>Error ${err.status}: ${message}</p>`
    }
}

d.addEventListener("DOMContentLoaded", e=> loadPokemons(pokeAPI));

d.addEventListener("click", e => {
    if (e.target.matches(".links a")) {
        e.preventDefault();
        loadPokemons(e.target.getAttribute("href"))
    }
})