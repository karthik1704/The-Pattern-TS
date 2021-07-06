export interface User {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

// Version Types
export interface Version {
    id: number;
    version_number: number;
    slug: string;
    uiapp: number;
    platform: number;
}

// Tag Types
export interface Tag {
    id: number;
    name: string;
    slug: string;
}

// UiImges Type
export interface UiImage {
    id: number;
    name: string;
    slug: string;
}

// Project Types

export interface Project {
    id: number;
    name: string;
    slug: string;
    copyright: string;
    url: string;
    image: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    tag: Tag[];

    created_at: string;
    modified_at: string;
    version: Version[];
    uiimage: UiImage[];
}
