# вариант 7
expectedValue = function(arr)
{
    len = length(arr)
    sum = 0
    for (i in arr) {
        sum = sum + i
    }
    return (sum/len)
}
standartDeviation = function(arr)
{
    len = length(arr)
    mean = mean(arr)
    sum = 0
    for (i in arr) {
        sum = sum + (i - mean)^2
    }
    return ((sum/len)^0.5)
}
getMediana = function(arr)
{
    arr = sort(arr)
    len = length(arr)
    if (len %% 2 == 0) {
        return (mean(c(arr[len/2], arr[len/2 + 1])))
    } else {
        return (arr[floor(len/2)])
    }
}
main = function(log = FALSE)
{
    if (log == FALSE) {
        N = 1000
        for (i in 2:7) {
            N[i] = N[i-1]*2
        }
        meanArr = double(7)
        sdArr = double(7)
        medianArr = double(7)
        for (i in 1:7){
            arr = rbinom(N[i], size = 10, prob = 0.5)
            meanArr[i] = mean(arr)
            sdArr[i] = sd(arr)
            medianArr[i] = median(arr)
        }
        range = 1:7
        plot(range, meanArr[range], col = "red", type = "b", lty = "dashed", xlab="Размер генерации 1000-64000", ylab="Значения", ylim=c(1, 6))
        lines(range, sdArr[range], col = "blue", type = "b")
        lines(range, medianArr[range], col = "green", type = "b", lty = "dotted")
        legend(1, 1, legend = c("mean", "sd", "median"), lty = c("dashed", "solid", "dotted"), col = c("red", "blue", "green"), x = "bottomleft")
        # plot(range, sdArr[range], col = "blue", type = "b", lty = "dashed", xlab="Размер генерации 1000-64000", ylab="Медиана вектора")
    } else {
        N = 1000
        for (i in 2:7) {
            N[i] = N[i-1]*2
        }
        meanArr = double(7)
        sdArr = double(7)
        medianArr = double(7)
        for (i in 1:7){
            arr = rbinom(N[i], size = 10, prob = 0.5)
            meanArr[i] = mean(arr)
            sdArr[i] = sd(arr)
            medianArr[i] = median(arr)
            print("N = ");
            print(N[i]);

            print("Математическое ожидание")
            print("Самописная функция")
            print(expectedValue(arr))
            print("Встроенная функция")
            print(mean(arr))

            print("Cтандартное отклонение")
            print("Самописная функция")
            print(standartDeviation(arr))
            print("Встроенная функция")
            print(sd(arr))

            print("Медиана вектора")
            print("Самописная функция")
            print(getMediana(arr))
            print("Встроенная функция")
            print(median(arr))
        }
    }
}
main(FALSE)