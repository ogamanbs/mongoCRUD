import connectMongoDB from "@/libs/mongodb"
import Topic from "@/models/topic"


export async function POST(request) {
     const { title, description } = await request.json()
     await connectMongoDB()
     await Topic.create({title, description})
}