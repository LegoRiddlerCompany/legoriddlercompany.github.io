const riddlesList = [
    {
        riddle: "Mam masę zębów lecz nie jem nie gryzę. \nZnajdziesz mnie na czubku gdzieś pod twym fryzem.",
        hint: "Potrafi porządnie poczesać.",
        answers: ["grzebień", "grzebien"],
        videourl: []
    },
    {
        riddle: "Raz się toczy, a raz sprzyja. \nDobrze jest mnie mieć, w sejfie mnie trzymać.Mówię we wszystkich językach świata, ale własnego nie posiadam.",
        hint: "Legalny w Polsce bukmacher z kodem GIMPSONPL 300 zl free betu.",
        answers: ["fortuna"]
    },
    {
        riddle: "Mówię we wszystkich językach świata, ale własnego nie posiadam.",
        hint: "Najchętniej pojawiam się w górach lub pustym pokoju.",
        answers: ["echo"]
    },
    {
        riddle: "Jak mnie złapiesz to źle się poczujesz, \njesienią czy zimą was poszukuje.",
        hint: "Ktoś coś tam mnie dissował.",
        answers: ["choroba"]
    },
    {
        riddle: "Im bardziej Ty jesteś suchy tym bardziej ja staję się mokry.",
        hint: "Na haku w łazience.",
        answers: ["ręcznik", "recznik"]
    },
    {
        riddle: "Jest nas trzy, ale tylko we dwie za ręce się trzymamy. \nNikt nas się nie spodziewa, lecz zawsze się na Ciebie czychamy. \nDuże nie jesteśmy, ale hałas robimy spory. \nCo by nie patrzeć, straszymy lepiej niż największe potwory.",
        hint: "Można nas usłyszeć w trakcie burzy która łez nie roni.",
        answers: ["dziewięć", "dziewieć", "dziewięc", "dziewiec"]
    },
    {
        riddle: "Co widzi inaczej, niż widziane jest przez innych. \nPoluje na ludzi lecz ich wcale nie zjada. \nMa cztery łapy i czasem z pingwinami gada.",
        hint: "Jeden z pingwinów mieszkał kiedyś w polsce.",
        answers: ["lew"]
    },
    {
        riddle: "Co to za miejsce gdzie każdy tam chodzi. \nZa uścisk dłoni oferują ogromne nagrody. \nMałym wstępujesz a wielkim wychodzisz. \nCzęść nienawidzi, lecz mądry tylko słodzi.",
        hint: "Gdzie koła się kręcą a każdy nogą kroczy.",
        answers: ["kasyno"]
    },
    {
        riddle: "W lesie nie mieszka, choć nie jest mu daleko. \nJak wilk, nieswoją skórę przywdziewa. \nOgon wychodzi mimo że ogona nie ma.",
        hint: "Wtapia nierzadko i w niektórych miejscach jest już niedozwolony.",
        answers: ["dzikusek", "dzikuseq", "dzikuseqq", "zero", "zerotenfuras"]
    },
    {
        riddle: "Dzięki mnie załatwisz ważne sprawy, \nale sam nic za Ciebie nie zrobię. \nCzym jestem?",
        hint: "Brakuje podpowiastki",
        answers: ["długopis", "dlugopis", "długopisem", "dlugopisem"]
    },
    {
        riddle: "Jestem czymś czego nikt nie widział, \nnigdy nie byłem, ale będę. \nczym jestem?",
        hint: "Brakuje podpowiastki",
        answers: ["jutro", "jutrem"]
    },
    {
        riddle: "Ludzie to kupują do jedzenia, \nale tego nie jedzą. \nco to jest?",
        hint: "Brakuje podpowiastki",
        answers: ["talerz"]
    },
    {
        riddle: "Idzie w górę, ale nigdy w dół. \nco to jest?",
        hint: "Brakuje podpowiastki",
        answers: ["wiek"]
    },
    {
        riddle: "Mimo że mam szyje to nie mam głowy. \nczym jestem?",
        hint: "Brakuje podpowiastki",
        answers: ["butelka", "butla", "butelką", "butelka"]
    },
    {
        riddle: "Co należy do ciebie, \nale inni ludzie używają tego częściej?",
        hint: "Brakuje podpowiastki",
        answers: ["twoje imię", "twoje imie", "moje imię", "moje imie", "imię", "imie"]
    },
    {
        riddle: "Im wyżej się znajdziesz, tym niższe będzie, a chętnie bym ci je podniósł.",
        hint: "Brakuje podpowiastki",
        answers: ["ciśnienie", "cisnienie"]
    },
    {
        riddle: "Część ludzi pragnie jej, nawet kiedy jest gorzka, chociaż czasem ciężko ją przełknąć.",
        hint: "Brakuje podpowiastki",
        answers: ["prawda", "prawdę", "prawde"]
    },
    {
        riddle: "Kiedy nimi rzucasz, a ja nie łapie, to nie dzieje się nic, jednak gdy pomożesz mi je łapać, to łatwo możemy je zepsuć.",
        hint: "Brakuje podpowiastki",
        answers: ["żarty", "zarty", "żart", "zart"]
    },
    {
        riddle: "Możesz mnie uzyskać drobno krusząc kamień jak zapytasz o mnie kota, prawdy ci nie powie, ale też nie skłamie.",
        hint: "Brakuje podpowiastki",
        answers: ["miał", "mial", "meow", "miau"]
    },
    {
        riddle: "Choć mam duże wymagania, to nie oczekuje nic, twój sobowtór o mnie śpiewał na jednej ze swoich płyt.",
        hint: "Brakuje podpowiastki",
        answers: ["nowy batman", "batman"]
    },
    {
        riddle: "Zwiąże ci język, choć nie mam dłoni, Sparaliżuje ciało, bez jadu, bez broni, Mym bratem jest ciemność, a siostrą cisza, Najgłośniej przemawiam, gdy nikt się nie zbliża. Kim jestem?",
        hint: "Wielu mówi że mam wielkie oczy / Odwaga mym wrogiem",
        answers: ["strach"]
    },
    {
        riddle: "Mam dwie twarze, jedną wybierz mądrze, Gdy inną pokaże, dla ciebie los zły stworzę. Czym jestem?",
        hint: "Nawet jeśli pecha przyniosę, to wartość posiadam.",
        answers: ["moneta"]
    },
    {
        riddle: "Mówią, żem matką, choć ciągle mnie ranią, Wiele znieść mogę, ale jak nie przestaną, Bez jedzenia i tlenu na świecie zostaną. Czym jestem?",
        hint: "Mam dwie córki florę i faunę.",
        answers: ["natura"]
    },
    {
        riddle: "Nie mam ust, a każdy mnie słyszy, Jestem zdrowiem, choć bywam zaraźliwy, Jeśli ktoś zagadki tej łatwej nie zgadnie, To będziesz to ty, mój drogi Batmanie.",
        hint: "Mogę być szczery albo szyderczy.",
        answers: ["śmiech", "smiech"]
    },
    {
        riddle: "Dla jednej chwili zatrzymasz świat cały, dla jednej osoby porzucisz ideały. Potrafię przetrwać nawet w lodzie i mroku, i nigdy nie znikam z pamięci i wzroku. Czym jestem?",
        hint: "To nie różowy miś ani kwiaty.",
        answers: ["miłość", "miłośc", "miłosć", "milość", "milośc", "milosć", "milosc"]
    },
]
