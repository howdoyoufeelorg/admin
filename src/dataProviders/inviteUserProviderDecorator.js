import { GET_ONE, UPDATE } from "react-admin";

const entrypoint = process.env.REACT_APP_API_HOST;

const inviteUserProviderDecorator = dataProvider => (verb, resource, params) => {
    if (resource === "invite_user") {
        if (verb === GET_ONE) {
            return Promise.resolve({data: {id: params.id},});
        }
        if (verb === UPDATE) {
            fetch(entrypoint + "/users/process-invite", {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    redirect: "error", // manual, *follow, error
                    referrer: "no-referrer", // no-referrer, *client
                    body: JSON.stringify(params.data), // body data type must match "Content-Type" header
                    user: false
                }
            ).then(
                response => {
                    if (!response.ok) {
                        throw new Error(response.status, 'HTTP error, status = ' + response.status);
                    }
                    return response.json()
                }
            ).then(json => {
                // Nothing really needs to happen here - just a placeholder in case we need something later
            });
            return Promise.resolve({ data: {} });
        }
    }

    // Fallback to the dataProvider default handling for all other resources
    return dataProvider(verb, resource, params);
};

export {inviteUserProviderDecorator};