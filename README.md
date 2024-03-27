# Firestore Manager

Create 'managers' for your firestore collections. You can make calls like

```ts
const listing = await Listing.find({ title: "Charizard" }, { sort: "desc" });
```

## Setup

```ts
import manager from "firestore-manager";

export const Listing = manager<ListingType>({
  db,
  collectionId: "listings",
  _default: {
    id: "",
    title: "",
    quantity: 1,
    price: 0.0,
    description: "",
    createdAt: "",
    updatedAt: "",
  },
});
```

# Usage

### .create()

### .delete()

### .deleteMany()

### .find()

Get all listings

```ts
const listings = await Listing.find();
```

### .findAll()

### .findById()

### .findOne()

### .findOneAndUpdate()

### .findOneOrCreate()

### .new()

### .save()

### .update()
