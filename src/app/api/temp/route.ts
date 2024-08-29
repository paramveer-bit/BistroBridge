import ItemModel from '@/models/item.model'
import mongoose from 'mongoose'
import { auth } from "@/auth"
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'
import CategoryModel from '@/models/category.model'



////------------------------Adding New Items---------------------------------

export async function POST(req: NextRequest) {
    await dbConnect()
    try {
        const data = await req.json()
        const res = await ItemModel.insertMany(
            [
                {
                    "_id": "669e8dbf47722a5228785a6e",
                    "code": "140003",
                    "name": "Caramel Frappuccino",
                    "price": 99,
                    "stock": 15,
                    "image": "https://utfs.io/f/a5994c87-4e04-40df-90f6-e03f20300da9-jqddrj.webp",
                    "description": "This easy, copycat version of your favorite coffee shop drink tastes just like the real thing!\n\n",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8df047722a5228785a71",
                    "code": "140004",
                    "name": "Cookie Cake Milkshake",
                    "price": 129,
                    "stock": 15,
                    "image": "https://utfs.io/f/169abbab-98c0-4409-a80b-4c9e1ea21d27-r4kg75.webp",
                    "description": "Got leftover cookie cake after the big party? Now you'll know just what to do with it.\n\n",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8e1847722a5228785a74",
                    "code": "140005",
                    "name": "Maple-Peach Milk Shake",
                    "price": 139,
                    "stock": 15,
                    "image": "https://utfs.io/f/cc0948e8-07d2-44e7-bb8d-442d15404b9a-1ubnrc.webp",
                    "description": "Blend maple syrup, peaches, low-fat frozen yogurt, and low-fat milk to make this flavorfull milkshake. \n\n",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8e3a47722a5228785a77",
                    "code": "140006",
                    "name": "Mixed-Berry Shake",
                    "price": 149,
                    "stock": 15,
                    "image": "https://utfs.io/f/34a74682-9216-4b0f-b372-c0fc604ddb0e-cvyenq.webp",
                    "description": "Cool, creamy shakes and smoothies make the perfect summertime dessert. Blend ice cream, frozen berries, and whole milk for a rich treat that's sure to beat the heat.",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8e6447722a5228785a7a",
                    "code": "140007",
                    "name": "S’mores Frappuccino",
                    "price": 179,
                    "stock": 10,
                    "image": "https://utfs.io/f/68c22fc2-8a1c-4143-941f-bcc408c54e40-uzsmn2.webp",
                    "description": "You don't have to drive to your favorite coffee shop to be sipping on this glorious chocolate and coffee drink. Just throw all the ingredients together in a blender and enjoy a refreshing summer sweet treat. Bonus: You probably have most of the ingredients on hand already. What are you waiting for?",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8e8247722a5228785a7d",
                    "code": "140008",
                    "name": "Cran-Berry Green-Tea Smoothie",
                    "price": 199,
                    "stock": 10,
                    "image": "https://utfs.io/f/0ee85725-43d7-439b-9d28-b305d0edaef6-4djcf5.webp",
                    "description": "You don't have to drive to your favorite coffee shop to be sipping on this glorious chocolate and coffee drink. Just throw all the ingredients together in a blender and enjoy a refreshing summer sweet treat. Bonus: You probably have most of the ingredients on hand already. What are you waiting for?",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8eae47722a5228785a80",
                    "code": "140009",
                    "name": "Birthday Cake Shake",
                    "price": 179,
                    "stock": 10,
                    "image": "https://utfs.io/f/61729cfa-f477-420a-8912-74fbee58c714-gdxu2n.webp",
                    "description": "This 5-ingredient cake batter milkshake shows there's more than one use for store-bought cake mix.\n\n",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8ed147722a5228785a83",
                    "code": "140010",
                    "name": "Mint-Chocolate Chip Shake",
                    "price": 189,
                    "stock": 10,
                    "image": "https://utfs.io/f/b90debc5-2a62-49cb-bab3-bb23b1bf4ed1-47df4v.webp",
                    "description": "The green-hued ice cream is a favorite at ice cream parlors across the nation. We jazzed up our Mint-Chocolate Chip Shake with a few drops of green coloring for a faint tint of color.",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8ef047722a5228785a86",
                    "code": "140011",
                    "name": "Blackberry-Mango Breakfast Shake",
                    "price": 199,
                    "stock": 10,
                    "image": "https://utfs.io/f/fae98db2-6183-4edf-a8f9-be5b022ebf04-ag5m2b.webp",
                    "description": "Sneak silken tofu into a sweet-tart breakfast smoothie to keep energy high from morning through the 3pm afternoon slow-down. This is a great way to get extra protein and fiber past pickier palates.",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e8f1447722a5228785a89",
                    "code": "140012",
                    "name": "Mango Smoothie",
                    "price": 99,
                    "stock": 10,
                    "image": "https://utfs.io/f/d90d7b2f-64e6-4171-a3d8-3b677b7a5b55-3x4deg.webp",
                    "description": "Spice up a Mexican-inspired evening with a smoothie infused with the warm molasses flavor of brown sugar. Serve the slushy cocktail over ice.",
                    "category": "66926d3527280120864be472",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e91d547722a5228785aa0",
                    "code": "150001",
                    "name": "Oat Waffles",
                    "price": 99,
                    "stock": 10,
                    "image": "https://utfs.io/f/62f476f1-a724-45e2-ba64-2609c5051627-n2byvm.jpg",
                    "description": "These family favorites have more fiber and less fat than standard waffles. My 2 year-old daughter loves them with fresh berries.",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e921747722a5228785aa3",
                    "code": "150002",
                    "name": "Apple Spice Waffles",
                    "price": 159,
                    "stock": 10,
                    "image": "https://utfs.io/f/5f830a35-dda6-4d6a-8e29-222a4848a885-jvplns.jpg",
                    "description": "These apple waffles are cozy and comforting anytime—morning or evening. The smell of toasty waffles with apples is sure to warm you up on even the most blustery of winter days. —Jane Sims, De Leon, Texas",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e923947722a5228785aa6",
                    "code": "150003",
                    "name": "Breakfast BLT Waffles",
                    "price": 179,
                    "stock": 10,
                    "image": "https://utfs.io/f/2443ff94-b40d-47fe-9c16-7d796407f3b5-osz185.jpg",
                    "description": "I’m not a big fan of sweets for breakfast, but I love a crisp waffle. My son and I tried these BLT waffles, and they were a huge success! We used gluten-free, dairy-free waffles with fantastic results. —Courtney Stultz, Weir, Kansas",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e925f47722a5228785aa9",
                    "code": "150004",
                    "name": "Birthday Cake Waffles",
                    "price": 119,
                    "stock": 10,
                    "image": "https://utfs.io/f/412c312a-1f50-4a58-8d0e-b3f781f4b62e-56m3yj.jpg",
                    "description": "These super fun waffles—soft on the inside, crisp on the outside—taste just like cake batter! They are quick to whip up anytime but would make birthday mornings feel even more special. —Andrea Fetting, Franklin, Wisconsin",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e92f947722a5228785ab0",
                    "code": "150005",
                    "name": "Toasty Pumpkin Waffles",
                    "price": 159,
                    "stock": 10,
                    "image": "https://utfs.io/f/d27c2264-9692-4d06-8191-869a1f84350b-aj5pfu.jpg",
                    "description": "When I really want to impress folks, I serve these waffles. They're beautiful stacked and layered with pink sweet-tart cranberry butter. When I owned a bed and breakfast it was the recipe guests requested most. —Brenda Ryan, Marshall, Missouri",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e931747722a5228785ab3",
                    "code": "150006",
                    "name": "Blueberry Oat Waffles",
                    "price": 159,
                    "stock": 10,
                    "image": "https://utfs.io/f/041b4a97-7012-41e5-8e9f-0d6a456d0c5e-egff2.jpg",
                    "description": "I truly enjoy recipes that make just enough for the two of us, like this one for yummy waffles. Instead of blueberries, you can slice ripe strawberries on top—or use the batter to make pancakes. —Ruth Andrewson, Leavenworth, Washington",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"
                },
                {
                    "_id": "669e934047722a5228785ab6",
                    "code": "150007",
                    "name": "Banana-Nut Waffle Cake",
                    "price": 189,
                    "stock": 10,
                    "image": "https://utfs.io/f/1ac4ebc8-c1ce-4758-96f3-6556cc308b3d-a0gmkm.jpg",
                    "description": "I wanted to use waffles in a creative way and came up with an idea of making a cake out of them. Not only did it take much less time than making an ordinary cake, it came out just as delicious as a traditional cake. Waffles can be made ahead, wrapped and stored in the fridge until ready to assemble this cake. —Kristina S., Yonkers, New York",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e935f47722a5228785ab9",
                    "code": "150008",
                    "name": "PB&J Waffles",
                    "price": 189,
                    "stock": 10,
                    "image": "https://utfs.io/f/a79b5083-388f-4a1d-a62b-e57e4bbb7cce-whxogq.jpg",
                    "description": "I like to spread mine with peanut or almond butter for some protein. Then I top them with fresh berries, kind of like a PB&J. —Shannon Norris, Senior Food Stylist. Learn how to make healthy protein waffles.",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e937a47722a5228785abd",
                    "code": "150009",
                    "name": "Amish Waffles",
                    "price": 189,
                    "stock": 10,
                    "image": "https://utfs.io/f/df6a25e2-f899-40eb-bbae-d852a5594f96-ywewn2.jpg",
                    "description": "These waffles are so crispy and tasty, you wouldn't believe they could get any better—until you add the topping. It's so delicious.—Neil and Jeanne Liechty, Pensacola, Florida",
                    "category": "66991cf73e53f53e5798bc9f",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e964947722a5228785acb",
                    "code": "160001",
                    "name": "Macarons",
                    "price": 69,
                    "stock": 10,
                    "image": "https://utfs.io/f/10797270-1db7-4ccc-b0e4-0554d329d0bf-23f19o.jpg",
                    "description": "This sweet meringue-based biscuit-cake made from egg white, powdered sugar and almond flour, is quintessentially French, though popular myth has it that the chefs of Catherine de Medici from Italy introduced this when she married Henry II of France. In another legendary story, two nuns from the city of Nancy purportedly sold macarons commercially during the French Revolutionary in 1792 and made it famous. The Maison des Soeurs Macaron in Nancy is said to be baked according to the same centuries’ old recipe. Today, Saint-Emilion and Ladurée are world-renowned for their macarons.",
                    "category": "66991b5a3e53f53e5798bc9a",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e968447722a5228785ace",
                    "code": "160002",
                    "name": "Profiterole",
                    "price": 79,
                    "stock": 10,
                    "image": "https://utfs.io/f/ae26f6e5-a070-49d8-abf0-e487c683f076-yboz1z.jpg",
                    "description": "Another pastry supposedly brought to France by de Medici’s entourage of Italian chefs, this filled French choux pastry ball contains whipped cream, custard or ice-cream, and is decorated with powdered sugar, caramel or chocolate. Italian chef Panterelli invented choux pastry, but his original recipe changed over time and French patissier Jean Avice perfected the dough into choux buns. Then, chef Antoine Carême came up with the idea of filling the choux with cream in the 18th century, resulting in the profiterole as we know it today. He also invented the profiterole tower – ‘croquembouche’ - the wedding cake of choice in France.",
                    "category": "66991b5a3e53f53e5798bc9a",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e96c647722a5228785ad1",
                    "code": "160003",
                    "name": "Religieuse",
                    "price": 99,
                    "stock": 10,
                    "image": "https://utfs.io/f/fb1039db-2466-44ad-8a77-d4192b939c58-1r53ws.jpg",
                    "description": "Created in the 19th century by Italian pastry chef Frascati in Paris, this is considered one of the most famous desserts in France. Translates to mean ‘nun’, it consists of two choux buns on top of each other, resembling a chubby nun with a small habit around her shoulders. The bottom half of the religieuse is larger and fatter while the top circular is smaller, both filled with cream or custard. Some versions contain chestnut cream, coffee, caramel or rose flavours.",
                    "category": "66991b5a3e53f53e5798bc9a",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e96e747722a5228785ad4",
                    "code": "160004",
                    "name": "Pain Au Chocolat",
                    "price": 99,
                    "stock": 10,
                    "image": "https://utfs.io/f/5b5180e6-bfd2-4683-a946-bdcf5a40277a-3kzb7v.jpg",
                    "description": "Originally made from a brioche base, this means ‘chocolate bread’ in French and has since evolved to use the same buttery, flaky pastry as a croissant. It made its first appearance in the early 19th century and is also known as chocolatine in the south-west part of France.",
                    "category": "66991b5a3e53f53e5798bc9a",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e970647722a5228785ad7",
                    "code": "160005",
                    "name": "Mille Feuille",
                    "price": 89,
                    "stock": 10,
                    "image": "https://utfs.io/f/a8413bb3-6886-46fe-9efa-7deea64f4cc0-td0hcr.jpg",
                    "description": "A traditional mille-feuille, translated to mean ‘a thousand leaves’, consists of three layers of puff pastry, alternating with two layers of pastry cream, and is dusted with powdered sugar on top. It sounds simple enough in execution but takes a real expert to deliver an airy, flaky and crisp vanilla slice. Similar to the Italian Napoleon that is filled with almond cream, some mille feuille variations include whipped cream, fruits, custard or chocolate glaze. The first mille feuille recipe was seen in chef François Pierre de la Varenne’s cookbook Le Cuisinier François in 1651 and famous pastry chef Adolphe Seugnot has been credited with the creation as well in the 19th century.",
                    "category": "66991b5a3e53f53e5798bc9a",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"

                },
                {
                    "_id": "669e97b647722a5228785ae4",
                    "code": "160006",
                    "name": "Cannele ",
                    "price": 99,
                    "stock": 10,
                    "image": "https://utfs.io/f/b99b9a2f-f89a-4dd6-939c-23dba85c6e34-ye8p28.jpg",
                    "description": "A small crisp, caramelised brown cake with a custard-like centre that has a hint of rum and vanilla, made with flour and egg yolks. It comes in a distinctive cylindrical shape and hails from the Bordeaux region. Supposedly developed in the 17th century by nuns, the traditional recipe calls for the cannele to be baked in fluted copper moulds.",
                    "category": "66991b5a3e53f53e5798bc9a",
                    "__v": 0,
                    "restro": "66b66f0c9a047815c1cce78c"
                }
            ]
        )
        console.log(res)
        return NextResponse.json({ success: true, result: res, message: "Item created successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "Something went wrong which creating new item" }, { status: 500 })

    }


}