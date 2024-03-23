import EditTopicForm from '@/components/EditTopicForm'

const getTopicById = async (id) => {
    try {
        const hostname = window.location.hostname
        const res = await fetch(`https://${hostname}/api/topics/${id}`, {
            cache: "no-store",
        });

        if(!res.ok){
            throw new Error('Failed to Fetch topic')
        }

        return res.json();

    } catch (error) {
        console.log(error)
    }
}

export default async function editTopic({ params }){
    const { id } = params;
    const { topic } = await getTopicById(id);
    const { title, description } = topic;
    console.log(topic)
    return <EditTopicForm id={ id } title={ title } description={ description } />
}