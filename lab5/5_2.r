Nrows = 1:20
Names = c("Ivan","Petr","Gena","Alexey","Alexander","Diana","Nikolay","Elena","Polina","John","Illya","Den","Sergey","Kassandra","Grzegorz","Vlodimir","David","Konstantin","Danil","Daniil")
BirthYears = sample(1960:1985, 20)
EmployYears = integer(20)
Salaries = integer(20)
Taxes = double(20)
for (i in 1:20) {
    startPos = BirthYears[i] + 18
    EmployYears[i] = sample(startPos:2006, 1)
    if (BirthYears[i] < 1975) {
        Salaries[i] = (log(2007-EmployYears[i])+1)*8000
    } else {
        Salaries[i] = (log2(2007-EmployYears[i])+1)*8000
    }
    Taxes[i] = Salaries[i] * 0.13
}
df = data.frame(Nrows, Names, BirthYears, EmployYears, Salaries)
nrow(subset(df, Salaries > 15000)) # количество сотрудников с зп > 15к
df["Taxes"] = Taxes # добавляет столбец с налогами