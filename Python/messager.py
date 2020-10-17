
class Person:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade
        self.subcribed = {}
    def subcriber(self, *chanels):
        for chanel in chanels:
            self.subcribed.update(chanel)
    def unsubcriber(self, *chanels):
        for chanel in chanels:
            self.subcribed.pop(chanel)


