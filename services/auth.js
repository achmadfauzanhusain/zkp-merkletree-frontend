import callApi from "@/lib/api"

const ROOT_API = "http://localhost:8000"
const API_VERSION = "api/v1"

export async function setRegister(data) {
    const url = `${ROOT_API}/${API_VERSION}/auth/register`
    return callApi({
        url,
        method: "POST",
        data,
    })
}

export async function getRoot() {
    const url = `${ROOT_API}/${API_VERSION}/auth/root`
    return callApi({
        url,
        method: "GET",
    })
}

export async function getMerkleProof(index) {
    const url = `${ROOT_API}/${API_VERSION}/auth/proof/${index}`
    return callApi({
        url,
        method: "GET",
    })
}

export async function setLogin(data) {
    const url = `${ROOT_API}/${API_VERSION}/auth/login`
    return callApi({
        url,
        method: "POST",
        data,
    })
}