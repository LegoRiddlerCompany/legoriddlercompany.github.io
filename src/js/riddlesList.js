const riddlesList = [
    {
        riddle: "Mam masę zębów lecz nie jem nie gryzę. \nZnajdziesz mnie na czubku gdzieś pod twym fryzem.",
        answers: ["grzebień", "grzebien", "grzebieniem"],
        helper: {
            name: "harley",
            track: 0
        }
    },
    {
        riddle: "Nie mam ust, a każdy mnie słyszy. \nJestem zdrowiem, choć bywam zaraźliwy. \nJeśli ktoś zagadki tej łatwej nie zgadnie, \nto będziesz to Ty, mój drogi Batmanie.",
        answers: ["śmiech", "smiech", "śmiechem", "smiechem"]
    },
    {
        riddle: "Jak mnie złapiesz to źle się poczujesz, \njesienią czy zimą was poszukuję.",
        answers: ["choroba", "chorobą"]
    },
    {
        riddle: "Im bardziej Ty jesteś suchy, \ntym bardziej ja staję się mokry.",
        answers: ["ręcznik", "recznik", "ręcznikiem", "recznikiem"]
    },
    {
        riddle: "Co chodzi na czterech nogach, \npotem na dwóch i w końcu na trzech?",
        answers: ["człowiek", "czlowiek"]
    },
    {
        riddle: "Dzięki mnie załatwisz ważne sprawy, \nale sam nic za Ciebie nie zrobię.",
        answers: ["długopis", "dlugopis", "długopisem", "dlugopisem"]
    },
    {
        riddle: "Mam rzeki, ale nie mam wody, \nmam miasta, ale nie mam domów, \nmam lasy, ale nie mam drzew.",
        answers: ["mapą", "mapa", "mapy"]
    },
    {
        riddle: "Raz się toczy, a raz sprzyja. \nDobrze jest mnie mieć, \nw sejfie mnie trzymać.",
        answers: ["fortuną", "fortuna"]
    },
    {
        riddle: "Ten, kto mnie robi, nie potrzebuje mnie. \nTen, kto mnie kupuje, sam ze mnie nie korzysta. \nTen, kto ze mnie korzysta, nawet o tym nie wie.",
        answers: ["trumną", "trumna"]
    },
    {
        riddle: "Mówię we wszystkich językach świata, \nale własnego nie posiadam.",
        answers: ["echem", "echo"]
    },
    {
        riddle: "Co widzi inaczej, niż samo jest widziane, \npoluje na ludzi lecz ich wcale nie zjada, \nma cztery łapy piękne, wspaniałe, \nod czasu do czasu z pingwinami gada.",
        answers: ["lew", "lwem", "lwy"]
    },
    {
        riddle: "Możesz mnie uzyskać drobno krusząc kamień, \njak zapytasz o mnie kota, prawdy ci nie powie, \nale też nie skłamie.",
        answers: ["miał", "mial", "meow", "miau"]
    },
    {
        riddle: "Mówią, żem matką, choć ciągle mnie ranią. \nWiele znieść mogę, ale jak nie przestaną, \nbez jedzenia i tlenu na świecie zostaną.",
        answers: ["naturą", "natura", "matką ziemią", "matką ziemia", "matka ziemią", "matka ziemia", "matką naturą", "matką natura", "matka naturą", "matka natura"]
    },
    {
        riddle: "Co należy do ciebie, \nale inni ludzie używają tego częściej?",
        answers: ["twoje imię", "twoje imie", "imię", "imie", "moje imię", "moje imie", "imiona"]
    },
    {
        riddle: "Ludzie to kupują do jedzenia, \nale tego nie jedzą.",
        answers: ["talerz", "nóż", "noz", "nóz", "noż", "widelec", "sztuciec", "sztućce", "sztucce"]
    },
    {
        riddle: "Jeśli mnie zjesz, \nten który mnie posłał zje ciebie.",
        answers: ["przynęta", "przyneta", "przynętą", "przynetą"]
    },
    {
        riddle: "Nie mam wpływu na to czy rosnę, czy maleję.",
        answers: ["temperatura", "temperaturą"]
    },
    {
        riddle: "Możesz mnie trzymać w prawej ręce, \nale nigdy w lewej.",
        answers: ["lewą ręką", "lewa ręką", "lewa ręka", "lewa reką", "lewą reką", "lewą reka", "lewą ręka", "lewa reka", "lewą dłoń", "lewą dłon", "lewą dloń", "lewą dlon", "lewa dłoń", "lewa dłon", "lewa dloń", "lewa dlon", "lewą dłonią", "lewą dlonia", "lewą dłonia", "lewą dlonią", "lewa dłonią",
        "lewa dłonia", "lewa dlonią", "lewa dlonia"]
    },
    {
        riddle: "Mimo że mam szyję, \nto nie mam głowy.",
        answers: ["butelką", "butelka"]
    },
    {
        riddle: "Co byś nie zrobił to idzie w górę \ni nawet jak chciałbyś to w dół w ogóle.",
        answers: ["wiek"]
    },
    {
        riddle: "Dla jednej chwili zatrzymasz świat cały, \ndla jednej osoby porzucisz ideały. \nPotrafię przetrwać nawet w lodzie i mroku \ni nigdy nie znikam z pamięci i wzroku.",
        answers: ["miłość", "miłosc", "miłośc", "miłosć", "milość", "milośc", "milosć", "milosc"]
    },
    {
        riddle: "Kiedy nimi rzucasz, a ja nie łapie, to nie dzieje się nic, \njednak gdy pomożesz mi je łapać, to łatwo możemy je zepsuć.",
        answers: ["żart", "zart", "żarty", "zarty", "dowcip", "dowcpiy", "kawał", "kawal", "kawały",
        "kawaly"]
    },
    {
        riddle: "Zawsze biegnę za Tobą, krok w krok, choć nie mam nóg. \nZnikam, gdy robi się zupełnie ciemno, i uciekam, gdy próbujesz mnie złapać.",
        answers: ["twoim cieniem", "twój cień", "twój cien", "twoj cień", "twoj cien", "cień", "cien",
        "cieniem"]
    },
    {
        riddle: "Część ludzi mnie pragnie, nawet kiedy jestem gorzka, \nchociaż czasem ciężko mnie przełknąć.",
        answers: ["prawdą", "prawda", "prawdę", "prawde"]
    },
    {
        riddle: "Tylko u mnie znajdziesz czwartek przed środą.",
        answers: ["słownik", "slownik", "słownikiem", "slownikiem"]
    },
    {
        riddle: "Mam dwie twarze, jedną wybierz mądrze. \nGdy inną pokażę, dla ciebie los zły stworzę.",
        answers: ["monetą", "moneta"]
    },
    {
        riddle: "Co to za miejsce gdzie każdy chodzi, \nbo za uścisk dłoni oferują nagrody, \nmałym wstępujesz, a wielkim wychodzisz, \nczęść nienawidzi, lecz mądry tylko słodzi?",
        answers: ["kasyno", "kasyna", "casino"]
    },
    {
        riddle: "Choć mam duże wymagania, to nie oczekuje nic, \nktoś tam o mnie śpiewał na jednej ze swych płyt.",
        answers: ["nowy batman"]
    },
    {
        riddle: "Mogę przynieść płacz, mogę wywołać śmiech. \nRodzę się w ułamku sekundy, ale potrafię trwać przez całe życie. \nNie mam masy, ale potrafię bardzo ciążyć.",
        answers: ["wspomnienie", "wspomnieniem", "wspomnienia"]
    },
    {
        riddle: "Zwiąże ci język, choć nie mam dłoni. \nSparaliżuję ciało, bez jadu, bez broni. \nMym bratem jest ciemność, a siostrą cisza. \nNajgłośniej przemawiam, gdy nikt się nie zbliża.",
        answers: ["strach", "strachem"]
    },
    {
        riddle: "Nie mam oczu, ale kiedyś widziałam wszystko. \nMiałam dużo na głowie, lecz teraz jest tam czysto.",
        answers: ["czaszka", "czaszką", "czacha", "czachą"]
    },
    {
        riddle: "Nikt nas się nie spodziewa, a zawsze na Ciebie czyhamy. \nDuże nie jesteśmy, lecz hałas robimy spory Co by nie mówić, \nstraszymy lepiej niż największe potwory.",
        answers: ["dziewięć", "dziewięc", "dziewieć", "dziewiec", "9", "9,99", "9zł", "9zl", "9 złotych",
        "9 zlotych", "9,99zł", "9,99zl", "9.99", "9.99zł", "9.99zl"]
    },
    {
        riddle: "Im wyżej się znajdziesz, tym niższe będzie, \na chętnie bym ci je podniósł.",
        answers: ["ciśnienie", "cisnienie"]
    },
    {
        riddle: "Jak wilk, nieswoją skórę przywdziewa. \nW lesie nie mieszka, choć nie jest mu daleko. \nOgon wychodzi, choć ogona nie ma.",
        answers: ["dzikusek", "dzikuseq", "dzikuseqq", "zero", "zerotenfuras", "tenfuras"]
    },
    {
        riddle: "Jestem czymś czego nikt nie widział, \nnigdy nie byłem, ale będę.",
        answers: ["jutro", "jutrem"]
    },
    {
        riddle: "Gdy jestem potrzebna, nikt o mnie nie dba, \nrzucają mną w przepaść, gdzie ciemność bezwzględna. \nGdy jednak przestaje być już pożyteczna - czyszczą mnie, \ndają dostęp do powietrza.",
        answers: ["kotwica", "kotwicą", "kotwice", "kotwicę"]
    },
]
