{/auth/register, POST}

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.do23e@3eee.com",   // UNIQUE
  "password" : "password",
  "phone_number": "1234679325",
  "personal_number": "122211111111", // UNIQUE
  "office" : "saburtalo",
  "city" : "tbilisi ",
  "address" : "tbilisi2"

}

{/auth/login, POST} 

{
    "email": "john.do3e@eee.com",
    "password" : "pa25ssword"
}


 {/admin/create-parcels, POST}

 {
    "flight_info": {
        "flight_id": "6",
        "flight_from": "china",
        "arrived_at": "12"
    },
    "parcels": [
        {
            "tracking_id": "122132311121",   // UNIQUE
            "ownerId": "c012017e-6548-40c1-aee9-d73826b7dfcc",
            "weight": 4
        }
    ]
}


localhost:3000/admin/update-user/d2a1a0b5-2b62-4073-b766-89ad74190682