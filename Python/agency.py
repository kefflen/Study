
class Actor:
    def __init__(self, name):
        self.name = name
        self.agenda = {}
        self.count_works = 0

    def do_work(self, day, activity):
        if not day in self.agenda:
            self.agenda[day] = activity
            self.count_works += 1
            return True
        else:
            return False

    def __repr__(self):
        return f"Actor({self.name})"


class Agency:
    def __init__(self, actors: list):
        self.actors = {actor.name: actor for actor in actors}

    def oder_work(self, day, activity, *, preference=None, other=False):
        if preference:
            try:
                actor = self.actors[preference]
            except KeyError:
                if not other:
                    return False
            else:
                busy = not actor.do_work(day, activity)
                if busy and not other:
                    return False
                elif not busy:
                    return True
        for actor in sorted(self.actors.values(), key=lambda obj: obj.count_works):
            busy = not actor.do_work(day, activity)
            if not busy:
                return True
        else:
            return False

ag = Agency([Actor("A"), Actor("B"), Actor("C")])
ag.oder_work(1, "Estreia 1")
ag.oder_work(1, "Estreia 2")
ag.oder_work(2, "Estreia conclusão")
ag.oder_work(4, "Especial do C", preference="C")
ag.oder_work(5, "Aniversario do C", preference="A", other=True)
ag.oder_work(5, "Evento inesperado", preference="A", other=True)
ag.oder_work(10, "Novo itegrante?", preference="X")
