import { Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";

const PokemonInfo = ({label, value}) => (
    <Flex direction="row" gap={1}>
        <Text fontWeight="bold">{label}:</Text>
        <Text>{value}</Text>
    </Flex>
)

const PokemonModal = ({isOpen, onClose, pokemon}) => {
    const pokemonImage = pokemon.sprites.other['official-artwork'].front_default;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{pokemon.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Image src={pokemonImage}/>
                    <PokemonInfo label="Peso" value={`${pokemon.weight / 10}kg`}/>
                    <PokemonInfo label="Altura" value={`${pokemon.height / 10}m`}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default PokemonModal;