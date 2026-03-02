
import {NextRequest, NextResponse} from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic= new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '', 
});

export async function POST(request: NextRequest){
    try{
        const {team, storeLinks}= await request.json();
        console.log("Request received");
        console.log("Team:", team.map((p: any)=> p.name));
        console.log("Stores:", storeLinks);
        const colors=team.map((p: any)=> p.color);
        const uniqueColors= [...new Set(colors)];
        const pokemonList= team.map((p: any)=>
        `${p.name} (${p.color} colored, ${p.types.join('/')} type)`).join (', ');
        const prompt=`Testing: Please search ${storeLinks[0]} for colored clothing items. inform if I can access the site and find products`;
        console.log("Testing web search capability");
        const message= await anthropic.messages.create({
            model: "claude-sonnet-4-202550514",
            max_tokens: 1000,
            messages: [{
                role: "user",
                content: prompt
            }],
            tools: [{
                type: "web_search_20250305" as const,
                name: "web_search"
            }]
        });
        console.log("Prompt recieved");
        console.log("Content blocks:", message.content.length);
        let searchUsed= false;
        let responseText="";
        for (const block of message.content){
            if (block.type==="tool_use"){
                console.log("Web search has been used");
                console.log("Tool:", block.name);
                searchUsed= true;
            }
            if (block.type== "text"){
                responseText += block.text;
            }
        }
        return NextResponse.json({
            success: true,
            searchUsed: searchUsed,
            response: responseText,
            contentBlocks: message.content.length
        });
    }   catch (error: any){
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}