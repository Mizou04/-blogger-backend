import BlogPost from "@/Entities/BlogPost";

export interface BlogPostResponseDTO extends Omit<BlogPost, "like">{
}


export interface BlogPostMinResponseDTO extends Omit<BlogPostResponseDTO, "content">{
}
