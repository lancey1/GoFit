import React, { useEffect, useState, useContext } from "react";
import { StreamChat } from "stream-chat";
import {
    Chat,
    Channel,
    ChannelHeader,
    ChannelList,
    MessageList,
    MessageInput,
    Thread,
    Window,
    LoadingIndicator,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { AuthContext } from "../../context/AuthContext";

const App = () => {

    const [client, setClient] = useState(null);

    const auth = useContext(AuthContext);

    let streamUser;
    let filters;

    if (auth.user && auth.userId) {
        streamUser = {
            id: auth.userId,
            name: auth.user.name,
            image: auth.user.avatar
        };
        filters = { type: "messaging", members: { $in: [streamUser.id] } };
    }

    const sort = { last_message_at: -1 };
    const streamKey = process.env.REACT_APP_STREAM_KEY;

    // Original code
    // const streamUser = {
    //   id: auth.userId,
    //   name: auth.user.name,
    // };

    // const filters = { type: "messaging", members: { $in: [streamUser.id] } };
    // const sort = { last_message_at: -1 };
    // const streamKey = process.env.REACT_APP_STREAM_KEY

    useEffect(() => {

        async function init() {
            const newClient = StreamChat.getInstance(streamKey);
            await newClient.connectUser(streamUser, newClient.devToken(streamUser.id));

            const channel = newClient.channel("messaging", "react-talk", {
                name: "Talk about react",
                members: [streamUser.id],
            });
            setClient(newClient);
        }

        if (streamUser) init();

        return async () => { if (client) await client.disconnectUser(); }

    }, [auth,client]);

    if (!auth.user || !auth.userId) return;

    console.log('here')
    if (!client) return <LoadingIndicator />;

    console.log('there')
    if (client) return (
        <Chat client={client}>
            <ChannelList
                filters={filters}
                sort={sort}
                showChannelSearch={true}
            />
            <Channel>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
};

export default React.memo(App);
