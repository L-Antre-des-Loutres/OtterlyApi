# Variables
for arg in "$@"; do
    case $arg in
        --serveur_loader_link=*)
            SERVEUR_LOADER_LINK="${arg#*=}"
            shift
        ;;
        --serveur_path=*)
            SERVEUR_PATH="${arg#*=}"
            shift
        ;;
        --modpack_link=*)
            MODPACK_LINK="${arg#*=}"
            shift
        ;;
        --serveur_pack_link=*)
            SERVEUR_PACK_LINK="${arg#*=}"
            shift
        ;;
    esac
done

# Création du chemin du serveur
if [ -n "$SERVEUR_PATH" ]; then
    echo "Info : le serveur va être créé dans le dossier $SERVEUR_PATH"
    mkdir -p "$SERVEUR_PATH"
    cd "$SERVEUR_PATH"
else
    echo "Erreur : le chemin du serveur n'est pas renseigné."
    exit 1
fi

# Priorité serveur_pack_link
if [ -n "$SERVEUR_PACK_LINK" ]; then
    echo "Info : serveur_pack_link détecté, il remplace modpack_link et serveur_path."
    # Optionnel : tu peux "vider" les autres si tu veux
    MODPACK_LINK=""
    SERVEUR_PATH=""
fi


# Vérifications dépendantes
if [ -z "$SERVEUR_PACK_LINK" ]; then
    # Si serveur_pack n'est PAS renseigné, alors on exige modpack_link + serveur_path
    if [ -z "$MODPACK_LINK" ] || [ -z "$SERVEUR_LOADER_LINK" ]; then
        echo "Erreur : --modpack_link et --serveur_loader_link sont obligatoires."
        exit 1
    fi
fi


echo "Installation du serveur..."
echo "Serveur Loader : $SERVEUR_LOADER_LINK"
echo "Serveur Pack : $SERVEUR_PACK_LINK"
echo "Modpack : $MODPACK_LINK"
echo "Serveur Path : $SERVEUR_PATH"

# Installation du serveur
cd "$SERVEUR_PATH"

# Installation du serveur pack
if [ -n "$SERVEUR_PACK_LINK" ]; then
    curl -s -L "$SERVEUR_PACK_LINK" -o serveur.zip
    unzip -o serveur.zip
    rm serveur.zip
fi

# Installation du modpack et du serveur loader
if [ -n "$MODPACK_LINK" ] && [ -n "$SERVEUR_LOADER_LINK" ]; then
    curl -s -L "$MODPACK_LINK" -o modpack.zip
    curl -s -L "$SERVEUR_LOADER_LINK" -o serveur-installer.jar
    mkdir -p mods
    mv modpack.zip ./mods
    cd "$SERVEUR_PATH"/mods
    unzip -o modpack.zip
    rm modpack.zip
    cd ..
    echo "eula=true" > eula.txt
    java -jar serveur-installer.jar --installServer
    # Renommage de tous les fichiers .sh en start.sh
    for sh_file in *.sh; do
        mv "$sh_file" start.sh
    done

    # Allocation de la RAM
    echo "-Xms2G -Xmx8G" > user_jvm_args.txt
fi




