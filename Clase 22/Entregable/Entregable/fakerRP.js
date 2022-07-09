import faker from 'faker'

faker.locale = 'es'

const { commerce, image, random } = faker

export const randomData = (n) => {
    const data = [];

    for (let i = 0; i < n; i++) {
        let name = commerce.productName();
        let price = commerce.price();
        let desc = commerce.productDescription();
        let photo = image.technics();

        data.push({name: name, price: price, desc: desc, photo: photo})
    }

    return data;
}

