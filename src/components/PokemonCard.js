import { Badge, Card, CardBody, CardFooter, Heading, Image } from "@chakra-ui/react";

const PokemonCard = ({ name, image, type}) => {
    return (
        <Card>
            <CardBody>
                <Image 
                    src={image}
                />
                <Heading as='h4' size='md' marginTop="12px">
                    {name}
                </Heading>
            </CardBody>
            <CardFooter>
                <Badge colorScheme='purple'>POISON</Badge>
            </CardFooter>
        </Card>
    );
}

export default PokemonCard;