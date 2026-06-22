// Auto-generated from Grace_Pharmacy_2019_Stock_Control.xlsx — the pharmacy's real dispensary stock list.
// Wholesale purchase costs from the source records are intentionally omitted here; they are
// not retail prices. See the Product Catalog spreadsheet for cost/sourcing detail.
//
// Category images are generic, free-to-use stock photos from Pexels (not photos of Grace
// Pharmacy's actual stock) used here as visual anchors. Loaded directly from Pexels' CDN
// per their free license — see https://www.pexels.com/license/. Credited inline below.

export interface CatalogCategory {
  name: string
  blurb: string
  items: string[]
  image: {
    src: string
    alt: string
    credit: string
    creditUrl: string
  }
}

export const catalog: CatalogCategory[] = [
  {
    name: "Tablets & Capsules",
    blurb: "Prescription and over-the-counter tablets and capsules for everyday and chronic conditions.",
    items: ["Acetylsalisylic Acid 300mg", "Adcodol", "Adcorectic", "Allopurinol 100mg", "Aminophyllin 100mg", "Amitryptyline 25mg", "Amoxycillin Cap 250mg", "Anti Haemorrhoidal Suppositories", "Ascorbic Acid Tab 250mg", "Atenolol 100mg", "Bisacodyl Tab 5mg", "Calcium Gluconate Tabs", "Captopril Tab 25mg", "Cetrizine 10mg", "Chlorpheniramine Tabs 4mg", "Cimetidine 400mg", "Ciprofloxacin 500mg", "Clotrimazole Pessaries", "Cloxacillin Caps 250mg", "Colchicine Tabs 0.5mg", "Cotrimoxazole 960mg", "Diazepam/Valium Tabs 5mg", "Diclofenac Tab 50mg", "Doxycycline Tabs 100mg", "Erythromycin 250mg", "Ferrous Sulphate Tabs", "Flu Stat", "Folic Acid Tabs 5mg", "Furosemide Tabs 40mg", "Glibenclamide Tabs 5mg", "Griseofulvin Tabs 250mg", "Histacon Caps", "Hydrochlorothiazide Tabs 25mg", "Hyoscine Tabs 10mg", "Ibuprofen Tab 200mg", "Ibuprofen Tab 400mg", "Indomethacin Caps 25mg", "Loperamide Tabs 2mg (Lomotil)", "Loratadine", "Mebendazole 100mg Tabs", "Mefenamic Acid 250mg", "Metformin Tabs 500mg", "Metformin Tabs 850mg", "Metoclopramide Tabs 10mg", "Metronidazole 400mg", "Multivitamin Tabs", "Mybulen", "Neurobion Tabs", "Nifedipine 10mg", "Nitrofurantoin 100mg", "Norlevo", "Nystatin Vaginal Pessaries", "Omeprazole Tabs", "Oral Rehydration Salts", "Paracetamol 500mg", "Paracetamol Codeine Tab 500mg", "Pen VK Tab 250mg", "Prednisone Tab 5mg", "Prochlorperazine Tabs", "Promethazine Tabs 25mg", "Pyridoxine 25mg", "Salbutamol 4mg Tablets", "Sinucon Tab", "Throat Lozenges", "Tranexamic Acid", "Vitamin B Co Tablets"],
    image: {
      src: "https://images.pexels.com/photos/20140040/pexels-photo-20140040.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Tablets arranged on a clean white surface",
      credit: "Leeloo The First",
      creditUrl: "https://www.pexels.com/photo/pills-on-white-background-20140040/",
    },
  },
  {
    name: "Topical & Creams",
    blurb: "Creams, ointments, paints, and drops for skin, eye, and ear conditions.",
    items: ["Acyclovir Cream 5% 10g", "Anusol Ointment 25g", "Benzoic Salicylic Ointment (Whitfield's)", "Betamethasone Cream 0.1%", "Calamine Lotion 100ml", "Chloramphenicol Eye Drops 10ml", "Chloramphenicol Eye Ointment", "Chlorhexide Mouth Wash 100ml", "Chloro Ear Drops 10ml", "Clotrimazole Topical Cream 1% 20g", "Clotrimazole Vaginal Cream", "GV Paint", "Hydrocortisone Cream", "Ichthammol Ointment", "Mepyramine Cream 25g", "Mercurochrome Paint 20ml", "Methylsalicylate Ointment", "Miconazole Cream 2% 30g", "Nasal Drops - Oxymetazoline 5ml", "Nystatin Ointment", "Podophylline Paint 20ml", "Povidone Ointment", "Spersallerg Eye Drops 10ml", "Tetracycline Ointment 3% 25g", "Thymol Glycerine 100ml", "Vitamin E Cream"],
    image: {
      src: "https://images.pexels.com/photos/19049367/pexels-photo-19049367.png?auto=compress&cs=tinysrgb&w=900",
      alt: "Unlabeled cosmetic cream tube",
      credit: "Volker Thimm",
      creditUrl: "https://www.pexels.com/photo/a-tube-of-a-cosmetic-product-without-a-label-19049367/",
    },
  },
  {
    name: "Syrups & Suspensions",
    blurb: "Liquid medicines, including paediatric formulations.",
    items: ["Alcophyllex Syrup 100ml", "Alcophyllin Syrup 100ml", "Diphenhydramine Syrup 100ml", "Guaifenesin XL 60", "Liquid Paraffin 100ml", "Mayogel Suspension 100ml", "Medigel Suspension 100ml", "Mist Alba Suspension 100ml", "Mist Potassium Citrate 100ml", "Nystatin Oral Suspension", "Trifen Adult"],
    image: {
      src: "https://images.pexels.com/photos/5858861/pexels-photo-5858861.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Cough syrup being poured onto a spoon",
      credit: "cottonbro studio",
      creditUrl: "https://www.pexels.com/photo/a-person-holding-a-spoon-with-cough-syrup-5858861/",
    },
  },
  {
    name: "Other Medication",
    blurb: "Additional prescription medicines dispensed at the pharmacy.",
    items: ["Arachis Oil", "Cyproheptadine", "Fluconazole", "Pain Relief Gel", "Salbutamol Inhaler 200mg", "Sildenafil"],
    image: {
      src: "https://images.pexels.com/photos/13534590/pexels-photo-13534590.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Softgel capsules spilled from a glass jar",
      credit: "Odin Mcraig",
      creditUrl: "https://www.pexels.com/photo/a-close-up-of-softgel-capsules-13534590/",
    },
  },
  {
    name: "Devices & Supplies",
    blurb: "Equipment and dispensary supplies.",
    items: ["BP Machine", "Counting Tray", "Glucometer", "Glucose Test Strips", "Ointment Jars", "Pill Bags", "Room Temperature Thermometer", "Tongue Depressor"],
    image: {
      src: "https://images.pexels.com/photos/8088866/pexels-photo-8088866.jpeg?auto=compress&cs=tinysrgb&w=900",
      alt: "Hand using a digital blood pressure monitor",
      credit: "Yaroslav Shuraev",
      creditUrl: "https://www.pexels.com/photo/finger-pointing-on-digital-blood-pressure-monitor-8088866/",
    },
  },
]