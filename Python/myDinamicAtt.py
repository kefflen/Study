from collections import UserDict


class SmartDict(UserDict):
    def __getattr__(self, item):
        return self.data[item]


def constructor(iterable):
    if isinstance(iterable, (dict, SmartDict)):
        iterable = SmartDict(iterable)
        for key, item in iterable.items():
            iterable[key] = constructor(item)
        return iterable
    elif isinstance(iterable, list):
        for index, item in enumerate(iterable):
            iterable[index] = constructor(item)
    return iterable


d = SmartDict({"Pessoas": {"Kefflen": {"idade": 23, "sobrenome": "Moreno Ramos"}, "Pedro": {"idade": 20, "sobrenome": "da silva"}},
               "nomes": ["Kefflen", "Pedro"], "lista": [{"um": 1, "tres": 3, "cinco": 5}, {"zero": 0, "dois": 2, "quatro": 4}]})

sd = constructor(d)
print(sd.Pessoas.Kefflen)
print(sd.lista[0].um)