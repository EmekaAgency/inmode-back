// TODO Améliorer méthode
// TODO Ajouter une default picture selon le type d'image demandée
// TODO Ajouter unr résolution dynamique des path
// TODO Refaire en Gatsby pour le rendu non client
export const get_img_path = (path = "") => {
    var source_path = typeof window !== 'undefined' ? window.location.origin : '';
    if(typeof path == "string"){
        return source_path + path;
    }
    return "";
};

// TODO Améliorer méthode
// TODO Ajouter une default picture
// TODO Ajouter unr résolution dynamique des path
// TODO Refaire en Gatsby pour le rendu non client
export const get_avatar_path = (id = null) => {
    var source_path = typeof window !== 'undefined' ? window.location.href : '';
    var avatar_path = "images/profiles/avatar/";
    var default_avatar_path = "defaut_avatar.png";
    if(typeof id == "string" || typeof id == "number"){
        // TODO id permet de trouver le id_path par hash
        // return source_path + avatar_path + id_path;
        return source_path + avatar_path + id;
    }
    return source_path + avatar_path + default_avatar_path;
};