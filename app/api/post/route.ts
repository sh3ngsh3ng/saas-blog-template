import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { searchParams } = new URL(request.url)

    const id = searchParams.get("id")

    if (id == "*") {
        const result = await supabase.from("post").select("id").limit(10)

        return Response.json({ ...result })
    } else if (id) {
        const result = await supabase.from("post").select("*").eq("id", id).single()
        console.log("hit api: ", result)
        return Response.json({ ...result })
    }

    return Response.json({})

}