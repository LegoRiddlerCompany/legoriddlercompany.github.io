const riddlesList = [
    {
        riddle: "Mam masę zębów lecz nie jem nie gryzę. \nZnajdziesz mnie na czubku gdzieś pod twym fryzem.",
        answers: ["grzebień", "grzebien", "grzebieniem"],
        who: 'm',
        helper: {
            name: "harley",
            track: 0
        },
        rushingtrack: [0, 1, 2],
        losetrack: [0, 2, 1],
        wintrack: 0
    },
    {
        riddle: "Nie mam ust, a każdy mnie słyszy. \nJestem zdrowiem, choć bywam zaraźliwy. \nJeśli ktoś zagadki tej łatwej nie zgadnie, \nto będziesz to Ty, mój drogi Batmanie.",
        answers: ["śmiech", "smiech", "śmiechem", "smiechem"],
        who: 'h',
        helper: {
            name: "joker",
            track: 0
        },
        rushingtrack: [0, 1, 2],
        losetrack: [1, 3, 0],
        wintrack: 4
    },
    {
        riddle: "Jak mnie złapiesz to źle się poczujesz, \njesienią czy zimą was poszukuję.",
        answers: ["choroba", "chorobą"],
        who: 'm',
        helper: {
            name: "robin",
            track: 0
        },
        rushingtrack: [6, 0, 3],
        losetrack: [2, 3, 2],
        wintrack: 1
    },
    {
        riddle: "Im bardziej Ty jesteś suchy, \ntym bardziej ja staję się mokry.",
        answers: ["ręcznik", "recznik", "ręcznikiem", "recznikiem"],
        who: 'm',
        helper: {
            name: "barbara",
            track: 0
        },
        rushingtrack: [9, 3, 0],
        losetrack: [3, 0, 3],
        wintrack: 4
    },
    {
        riddle: "Co chodzi na czterech nogach, \npotem na dwóch i w końcu na trzech?",
        answers: ["człowiek", "czlowiek"],
        who: 'h',
        helper: {
            name: "penguin",
            track: 0
        },
        rushingtrack: [4, 6, 7],
        losetrack: [2, 0, 1],
        wintrack: 1
    },
    {
        riddle: "Dzięki mnie załatwisz ważne sprawy, \nale sam nic za Ciebie nie zrobię.",
        answers: ["długopis", "dlugopis", "długopisem", "dlugopisem"],
        who: 'm',
        helper: {
            name: "barbara",
            track: 1
        },
        rushingtrack: [2, 1, 7],
        losetrack: [0, 3, 4],
        wintrack: 2
    },
    {
        riddle: "Mam rzeki, ale nie mam wody, \nmam miasta, ale nie mam domów, \nmam lasy, ale nie mam drzew.",
        answers: ["mapą", "mapa", "mapy"],
        who: 'h',
        helper: {
            name: "npc",
            track: 0
        },
        rushingtrack: [7, 4, 0],
        losetrack: [1, 2, 2],
        wintrack: 2
    },
    {
        riddle: "Raz się toczy, a raz sprzyja. \nDobrze jest mnie mieć, \nw sejfie mnie trzymać.",
        answers: ["fortuną", "fortuna"],
        who: 'm',
        helper: {
            name: "jim",
            track: 0
        },
        rushingtrack: [5, 4, 0],
        losetrack: [1, 2, 0],
        wintrack: 3
    },
    {
        riddle: "Ten, kto mnie robi, nie potrzebuje mnie. \nTen, kto mnie kupuje, sam ze mnie nie korzysta. \nTen, kto ze mnie korzysta, nawet o tym nie wie.",
        answers: ["trumną", "trumna"],
        who: 'h',
        helper: {
            name: "alfred",
            track: 0
        },
        rushingtrack: [5, 3, 2],
        losetrack: [0, 1, 0],
        wintrack: 3
    },
    {
        riddle: "Mówię we wszystkich językach świata, \nale własnego nie posiadam.",
        answers: ["echem", "echo"],
        who: 'm',
        helper: {
            name: "rasalghul",
            track: 0
        },
        rushingtrack: [8, 1, 0],
        losetrack: [2, 1, 3],
        wintrack: 1
    },
    {
        riddle: "Co widzi inaczej, niż samo jest widziane, \npoluje na ludzi lecz ich wcale nie zjada, \nma cztery łapy piękne, wspaniałe, \nod czasu do czasu z pingwinami gada.",
        answers: ["lew", "lwem", "lwy"],
        who: 'h',
        helper: {
            name: "penguin",
            track: 1
        },
        rushingtrack: [9, 7, 0],
        losetrack: [4, 3, 1],
        wintrack: 4
    },
    {
        riddle: "Możesz mnie uzyskać drobno krusząc kamień, \njak zapytasz o mnie kota, prawdy ci nie powie, \nale też nie skłamie.",
        answers: ["miał", "mial", "meow", "miau"],
        who: 'm',
        helper: {
            name: "catwoman",
            track: 0
        },
        rushingtrack: [2, 1, 3],
        losetrack: [3, 0, 1],
        wintrack: 4
    },
    {
        riddle: "Mówią, żem matką, choć ciągle mnie ranią. \nWiele znieść mogę, ale jak nie przestaną, \nbez jedzenia i tlenu na świecie zostaną.",
        answers: ["naturą", "natura", "matką ziemią", "matką ziemia", "matka ziemią", "matka ziemia", "matką naturą", "matką natura", "matka naturą", "matka natura"],
        who: 'h',
        helper: {
            name: "poisonivy",
            track: 0
        },
        rushingtrack: [1, 0, 8],
        losetrack: [3, 1, 2],
        wintrack: 0
    },
    {
        riddle: "Co należy do ciebie, \nale inni ludzie używają tego częściej?",
        answers: ["twoje imię", "twoje imie", "imię", "imie", "moje imię", "moje imie", "imiona"],
        who: 'm',
        helper: {
            name: "lucius",
            track: 0
        },
        rushingtrack: [7, 6, 9],
        losetrack: [0, 3, 2],
        wintrack: 0
    },
    {
        riddle: "Ludzie to kupują do jedzenia, \nale tego nie jedzą.",
        answers: ["talerz", "nóż", "noz", "nóz", "noż", "widelec", "sztuciec", "sztućce", "sztucce"],
        who: 'm',
        helper: {
            name: "joker",
            track: 1
        },
        rushingtrack: [0, 1, 6],
        losetrack: [2, 3, 4],
        wintrack: 2
    },
    {
        riddle: "Jeśli mnie zjesz, \nten który mnie posłał zje ciebie.",
        answers: ["przynęta", "przyneta", "przynętą", "przynetą"],
        who: 'h',
        helper: {
            name: "robin",
            track: 1
        },
        rushingtrack: [0, 6, 4],
        losetrack: [2, 2, 3],
        wintrack: 1
    },
    {
        riddle: "Nie mam wpływu na to czy rosnę, czy maleję.",
        answers: ["temperatura", "temperaturą"],
        who: 'h',
        helper: {
            name: "robin",
            track: 2
        },
        rushingtrack: [0, 1, 2],
        losetrack: [1, 3, 4],
        wintrack: 2
    },
    {
        riddle: "Możesz mnie trzymać w prawej ręce, \nale nigdy w lewej.",
        answers: ["lewą ręką", "lewa ręką", "lewa ręka", "lewa reką", "lewą reką", "lewą reka", "lewą ręka", "lewa reka", "lewą dłoń", "lewą dłon", "lewą dloń", "lewą dlon", "lewa dłoń", "lewa dłon", "lewa dloń", "lewa dlon", "lewą dłonią", "lewą dlonia", "lewą dłonia", "lewą dlonią", "lewa dłonią",
        "lewa dłonia", "lewa dlonią", "lewa dlonia"],
        who: 'h',
        helper: {
            name: "robin",
            track: 3
        },
        rushingtrack: [10, 6, 7],
        losetrack: [0, 0, 0],
        wintrack: 3
    },
    {
        riddle: "Mimo że mam szyję, \nto nie mam głowy.",
        answers: ["butelką", "butelka"],
        who: 'm',
        helper: {
            name: "harley",
            track: 1
        },
        rushingtrack: [4, 5, 7],
        losetrack: [1, 2, 0],
        wintrack: 1
    },
    {
        riddle: "Co byś nie zrobił to idzie w górę \ni nawet jak chciałbyś to w dół w ogóle.",
        answers: ["wiek"],
        who: 'm',
        helper: {
            name: "rasalghul",
            track: 1
        },
        rushingtrack: [1, 0, 3],
        losetrack: [2, 1, 2],
        wintrack: 3
    },
    {
        riddle: "Dla jednej chwili zatrzymasz świat cały, \ndla jednej osoby porzucisz ideały. \nPotrafię przetrwać nawet w lodzie i mroku \ni nigdy nie znikam z pamięci i wzroku.",
        answers: ["miłość", "miłosc", "miłośc", "miłosć", "milość", "milośc", "milosć", "milosc"],
        who: 'h',
        helper: {
            name: "friz",
            track: 0
        },
        rushingtrack: [9, 0, 3],
        losetrack: [4, 0, 1],
        wintrack: 4
    },
    {
        riddle: "Kiedy nimi rzucasz, a ja nie łapie, to nie dzieje się nic, \njednak gdy pomożesz mi je łapać, to łatwo możemy je zepsuć.",
        answers: ["żart", "zart", "żarty", "zarty", "dowcip", "dowcpiy", "kawał", "kawal", "kawały",
        "kawaly"],
        who: 'm',
        helper: {
            name: "joker",
            track: 2
        },
        rushingtrack: [8, 4, 9],
        losetrack: [3, 0, 1],
        wintrack: 4
    },
    {
        riddle: "Zawsze biegnę za Tobą, krok w krok, choć nie mam nóg. \nZnikam, gdy robi się zupełnie ciemno, i uciekam, gdy próbujesz mnie złapać.",
        answers: ["twoim cieniem", "twój cień", "twój cien", "twoj cień", "twoj cien", "cień", "cien",
        "cieniem"],
        who: 'h',
        helper: {
            name: "jim",
            track: 1
        },
        rushingtrack: [4, 1, 10],
        losetrack: [3, 3, 2],
        wintrack: 4
    },
    {
        riddle: "Część ludzi mnie pragnie, nawet kiedy jestem gorzka, \nchociaż czasem ciężko mnie przełknąć.",
        answers: ["prawdą", "prawda", "prawdę", "prawde"],
        who: 'm',
        helper: {
            name: "lucius",
            track: 1
        },
        rushingtrack: [5, 0, 7],
        losetrack: [1, 3, 2],
        wintrack: 0
    },
    {
        riddle: "Tylko u mnie znajdziesz czwartek przed środą.",
        answers: ["słownik", "slownik", "słownikiem", "slownikiem"],
        who: 'h',
        helper: {
            name: "catwoman",
            track: 1
        },
        rushingtrack: [9, 1, 5],
        losetrack: [2, 3, 4],
        wintrack: 1
    },
    {
        riddle: "Mam dwie twarze, jedną wybierz mądrze. \nGdy inną pokażę, dla ciebie los zły stworzę.",
        answers: ["monetą", "moneta"],
        who: 'm',
        helper: {
            name: "twoface",
            track: 0
        },
        rushingtrack: [3, 1, 2],
        losetrack: [0, 2, 3],
        wintrack: 0
    },
    {
        riddle: "Co to za miejsce gdzie każdy chodzi, \nbo za uścisk dłoni oferują nagrody, \nmałym wstępujesz, a wielkim wychodzisz, \nczęść nienawidzi, lecz mądry tylko słodzi?",
        answers: ["kasyno", "kasyna", "casino"],
        who: 'h',
        helper: {
            name: "harley",
            track: 2
        },
        rushingtrack: [0, 1, 2],
        losetrack: [1, 1, 0],
        wintrack: 2
    },
    {
        riddle: "Choć mam duże wymagania, to nie oczekuje nic, \nktoś tam o mnie śpiewał na jednej ze swych płyt.",
        answers: ["nowy batman"],
        who: 'm',
        helper: {
            name: "unknown",
            track: 0
        },
        rushingtrack: [7, 1, 5],
        losetrack: [1, 0, 0],
        wintrack: 0
    },
    {
        riddle: "Mogę przynieść płacz, mogę wywołać śmiech. \nRodzę się w ułamku sekundy, ale potrafię trwać przez całe życie. \nNie mam masy, ale potrafię bardzo ciążyć.",
        answers: ["wspomnienie", "wspomnieniem", "wspomnienia"],
        who: 'h',
        helper: {
            name: "alfred",
            track: 1
        },
        rushingtrack: [2, 1, 3],
        losetrack: [0, 0, 1],
        wintrack: 3
    },
    {
        riddle: "Zwiąże ci język, choć nie mam dłoni. \nSparaliżuję ciało, bez jadu, bez broni. \nMym bratem jest ciemność, a siostrą cisza. \nNajgłośniej przemawiam, gdy nikt się nie zbliża.",
        answers: ["strach", "strachem"],
        who: 'm',
        helper: {
            name: "scarecrow",
            track: 0
        },
        rushingtrack: [7, 6, 9],
        losetrack: [2, 1, 3],
        wintrack: 1
    },
    {
        riddle: "Nie mam oczu, ale kiedyś widziałam wszystko. \nMiałam dużo na głowie, lecz teraz jest tam czysto.",
        answers: ["czaszka", "czaszką", "czacha", "czachą"],
        who: 'h',
        helper: {
            name: "unknown",
            track: 1
        },
        rushingtrack: [7, 5, 2],
        losetrack: [4, 2, 0],
        wintrack: 4
    },
    {
        riddle: "Nikt nas się nie spodziewa, a zawsze na Ciebie czyhamy. \nDuże nie jesteśmy, lecz hałas robimy spory Co by nie mówić, \nstraszymy lepiej niż największe potwory.",
        answers: ["dziewięć", "dziewięc", "dziewieć", "dziewiec", "9", "9,99", "9zł", "9zl", "9 złotych",
        "9 zlotych", "9,99zł", "9,99zl", "9.99", "9.99zł", "9.99zl"],
        who: 'h',
        helper: {
            name: "joker",
            track: 3
        },
        rushingtrack: [10, 9, 0],
        losetrack: [3, 0, 2],
        wintrack: 0
    },
    {
        riddle: "Im wyżej się znajdziesz, tym niższe będzie, \na chętnie bym ci je podniósł.",
        answers: ["ciśnienie", "cisnienie"],
        who: 'm',
        helper: {
            name: "twoface",
            track: 1
        },
        rushingtrack: [8, 2, 4],
        losetrack: [3, 2, 1],
        wintrack: 2
    },
    {
        riddle: "Jak wilk, nieswoją skórę przywdziewa. \nW lesie nie mieszka, choć nie jest mu daleko. \nOgon wychodzi, choć ogona nie ma.",
        answers: ["dzikusek", "dzikuseq", "dzikuseqq", "zero", "zerotenfuras", "tenfuras"],
        who: 'h',
        helper: {
            name: "unknown",
            track: 2
        },
        rushingtrack: [3, 1, 5],
        losetrack: [2, 0, 3],
        wintrack: 1
    },
    {
        riddle: "Jestem czymś czego nikt nie widział, \nnigdy nie byłem, ale będę.",
        answers: ["jutro", "jutrem"],
        who: 'm',
        helper: {
            name: "superman",
            track: 0
        },
        rushingtrack: [2, 1, 5],
        losetrack: [3, 3, 4],
        wintrack: 3
    },
    {
        riddle: "Gdy jestem potrzebna, nikt o mnie nie dba, \nrzucają mną w przepaść, gdzie ciemność bezwzględna. \nGdy jednak przestaje być już pożyteczna - czyszczą mnie, \ndają dostęp do powietrza.",
        answers: ["kotwica", "kotwicą", "kotwice", "kotwicę"],
        who: 'h',
        helper: {
            name: "aquaman",
            track: 0
        },
        rushingtrack: [6, 4, 5],
        losetrack: [1, 3, 4],
        wintrack: 4
    },
]
