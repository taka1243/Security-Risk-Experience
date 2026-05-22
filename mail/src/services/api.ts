export async function getQuestion(id: number) {
    const res = await fetch(`/api/question/${id}`)

    return await res.json()
}

export async function answerQuestion(
    questionId: number,
    answer: string
) {
    const res = await fetch("/api/answer", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            questionId,
            answer,
        }),
    })

    return await res.json()
}