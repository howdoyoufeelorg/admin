import { GET_ONE, UPDATE } from "react-admin";
import {fetchHydra as baseFetchHydra} from "@api-platform/admin";

const entrypoint = process.env.REACT_APP_API_HOST;

// A function decorating a dataProvider for handling user profiles
const inviteUserProviderDecorator = dataProvider => (verb, resource, params) => {
    // I know I only GET or UPDATE the profile as there is only one for the current user
    // To showcase how I can do something completely different here, I'll store it in local storage
    // You can replace this with a customized fetch call to your own API route, too
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