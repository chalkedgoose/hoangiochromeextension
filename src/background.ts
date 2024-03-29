
const handleNetworking = async (request: any) => {
    try {
        const data = await fetch(request.endpoint, { method: request.method });
        return await (await fetch(request.endpoint, { method: request.method })).json()
    } catch (error) {
        console.error(error);
    }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    try {
        if (request.networking) {
            sendResponse({ result: await handleNetworking(request) });
            // need to return true in order to keep channel open during async tasks.
            return true;
        }
        else {
            sendResponse({ message: "unknown request and or command." });
        }
    } catch (error) {
        sendResponse({ message: error });
    }
});

