export type FaqItem = { question: string; answer: string };
export type FaqCategory = { title: string; subtitle?: string; items: FaqItem[] };

export const FAQ_REFERENCE_HERO = {
  "title": "Frequently Asked Questions About Home Remodeling in Connecticut",
  "subtitle": "Get answers to the most common questions Connecticut homeowners ask about remodeling costs, timelines, permits, and the renovation process.",
  "heading": "Home Remodeling Questions Answered"
} as const;

export const FAQ_REFERENCE_GENERAL: FaqItem[] = [
  {
    "question": "How much does a kitchen remodel cost in Connecticut?",
    "answer": "Kitchen remodeling in Connecticut costs $30,000 to $100,000 or more depending on scope. Basic kitchen updates with cabinet refacing and new countertops run $25,000 to $50,000. Mid-range remodels with new cabinets, countertops, flooring, and appliances cost $50,000 to $90,000. High-end custom kitchens with layout changes and premium materials range from $90,000 to $150,000 or more. Final cost depends on your selections, the condition of existing systems behind the walls, and whether the project involves structural changes or relocated plumbing."
  },
  {
    "question": "How much does a bathroom remodel cost in CT?",
    "answer": "Bathroom remodeling in Connecticut typically costs $15,000 to $80,000 or more depending on the scope of work. A basic bathroom refresh with new fixtures, paint, and hardware runs $15,000 to $25,000. Mid-range renovations with new tile, vanity, and shower or tub replacement cost $25,000 to $50,000. High-end bathroom remodels with custom tile work, frameless glass showers, and premium fixtures range from $50,000 to $80,000 or more. Costs vary by town, material selections, and the condition of existing plumbing and electrical."
  },
  {
    "question": "How long does basement finishing take?",
    "answer": "Basement finishing in Connecticut typically takes 4 to 8 weeks from start to completion. The timeline depends on the size of the space, the complexity of the layout, and whether the project includes a bathroom, kitchenette, or egress window installation. Permit approval adds one to two weeks before construction begins in most Connecticut municipalities. We provide a detailed project schedule before work starts so you know exactly what to expect at every phase."
  },
  {
    "question": "Do I need a permit for remodeling in Connecticut?",
    "answer": "Yes. Most remodeling projects in Connecticut require permits, especially work involving electrical, plumbing, or structural changes. Permit requirements vary by municipality, and some towns require separate permits for electrical, plumbing, and building work, each with their own inspections. BuiltWell handles all permit applications and coordinates every required inspection as part of the project. You do not need to visit the building department or manage any of the paperwork yourself."
  },
  {
    "question": "How much does flooring cost per square foot in CT?",
    "answer": "Flooring installation in Connecticut costs $6 to $25 per square foot installed, depending on the material. Luxury vinyl plank (LVP) runs $6 to $12 per square foot. Engineered hardwood costs $10 to $18 per square foot. Solid hardwood and premium tile range from $14 to $25 per square foot installed. These prices include materials, underlayment, and professional installation. Subfloor preparation or removal of existing flooring may add to the total if conditions require it."
  },
  {
    "question": "What is the best flooring for basements in CT?",
    "answer": "Luxury vinyl plank (LVP) and porcelain tile are the best flooring options for Connecticut basements. LVP is waterproof, comfortable underfoot, and handles the temperature and humidity fluctuations common in below-grade spaces. Porcelain tile is extremely durable and works well in basements with in-floor heating systems. We do not recommend solid hardwood or standard laminate for basements due to moisture concerns that are common in Connecticut's climate. During your consultation, we can help you choose the right material based on how you plan to use the space."
  },
  {
    "question": "How do I choose a remodeling contractor in CT?",
    "answer": "Verify that the contractor holds a valid Connecticut Home Improvement Contractor (HIC) license, which you can check on the CT eLicense portal. Confirm they carry general liability insurance and workers' compensation coverage. Read Google reviews and ask for references from recent projects in your area. Get a detailed written proposal that breaks out costs by trade, not just a lump sum. A reputable Connecticut contractor will be transparent about pricing, timeline, and the scope of work included."
  },
  {
    "question": "How long does a kitchen remodel take?",
    "answer": "A kitchen remodel in Connecticut typically takes 6 to 12 weeks of active construction, depending on scope. Cabinet lead times need to be added to that figure. Custom cabinets require 8 to 12 weeks for manufacturing. Semi-custom cabinets arrive in 4 to 6 weeks. Stock cabinets are available much faster. During the planning phase, we finalize selections and order materials immediately so lead times run concurrently with pre-construction work. Your written proposal includes a complete project schedule."
  },
  {
    "question": "Does a bathroom remodel increase home value in CT?",
    "answer": "Yes. A bathroom remodel in Connecticut typically returns 60 to 70 percent of the investment at resale, according to national remodeling cost-vs-value data. Mid-range bathroom renovations tend to deliver the strongest return on investment. Updated bathrooms also help homes sell faster in competitive Connecticut real estate markets. Beyond resale value, a renovated bathroom improves daily comfort and functionality for the years you live in the home."
  },
  {
    "question": "What is included in basement finishing?",
    "answer": "A complete basement finishing project includes framing and insulation of exterior walls, drywall installation and finishing, electrical work including lighting and outlets, flooring installation, ceiling finishing (drywall or drop ceiling), and all required permits and inspections. Many projects also include a bathroom, egress window, or dedicated HVAC zones. We handle every aspect of the build from permit applications through final walkthrough, so you have a single point of contact throughout the project."
  }
];

export const FAQ_REFERENCE_CATEGORIES: FaqCategory[] = [
  {
    "title": "Kitchen Remodeling",
    "items": [
      {
        "question": "Do I need a permit for a kitchen remodel in Connecticut?",
        "answer": "Yes. Any kitchen remodel involving electrical, plumbing, or structural work requires a building permit in Connecticut. If you are relocating appliances, adding outlets, or changing the layout, permits are required. BuiltWell handles all permit applications and coordinates inspections throughout the project. Permit costs are included in your proposal."
      },
      {
        "question": "How long do custom cabinets take to arrive?",
        "answer": "Custom cabinets typically require 8 to 12 weeks for manufacturing and delivery. Semi-custom cabinets arrive in 4 to 6 weeks. Stock cabinets are available much faster. We finalize cabinet selections during the planning phase and order immediately so lead times run concurrently with pre-construction preparation work."
      },
      {
        "question": "Can I stay in my home during a kitchen remodel?",
        "answer": "Yes, most homeowners stay in their home during a kitchen remodel. We set up a temporary kitchen area with access to a sink, microwave, and refrigerator in another room. Dust barriers and containment systems separate the work area from the rest of your home. We clean the job site at the end of every workday."
      },
      {
        "question": "What is included in a mid-range kitchen remodel?",
        "answer": "A mid-range kitchen remodel ($50,000 to $90,000) typically includes new semi-custom cabinets, quartz or granite countertops, new flooring, updated appliances, new lighting fixtures, a tile backsplash, and fresh paint. It covers demolition, electrical upgrades for new appliance locations, plumbing for sink relocation if needed, and all finishing work. Permits and inspections are included."
      },
      {
        "question": "What countertop materials work best for Connecticut kitchens?",
        "answer": "Quartz and granite are the most popular countertop choices in Connecticut kitchen remodels. Quartz is non-porous, requires no sealing, and is available in a wide range of colors and patterns. Granite is a natural stone that offers unique veining and exceptional heat resistance. Marble is beautiful but requires more maintenance and is more susceptible to staining and etching. Butcher block works well for island accents. We help you compare options during the selections phase."
      },
      {
        "question": "Should I choose an open floor plan for my kitchen remodel?",
        "answer": "Opening up the kitchen to adjacent living or dining spaces is one of the most requested layout changes in Connecticut remodels. However, it depends on your home's structure. Load-bearing walls require a structural beam and potentially a permit for the modification. We assess the feasibility during the consultation and include any structural work in the proposal. An open layout typically adds $5,000 to $15,000 to the project cost depending on the scope of the structural changes."
      },
      {
        "question": "Can I change the layout of my kitchen during a remodel?",
        "answer": "Yes. Layout changes are common in mid-range and high-end kitchen remodels. Moving the sink requires rerouting plumbing. Relocating the range or cooktop may require new gas lines or electrical circuits. Adding an island needs adequate clearance (minimum 36 inches on all sides for walkways, 42 inches recommended). We plan these changes during the design phase and handle all trades in-house so the work is coordinated."
      },
      {
        "question": "How do I set a realistic budget for a kitchen remodel?",
        "answer": "Start with your goals. A cosmetic refresh (cabinet refacing, new counters, paint) runs $25,000 to $50,000. A full remodel with new cabinets, countertops, flooring, and appliances costs $50,000 to $90,000. High-end projects with layout changes and premium materials range from $90,000 to $150,000 or more. We provide a detailed proposal with specific line items so you can see exactly where the budget goes before committing."
      },
      {
        "question": "What kitchen appliances should I upgrade during a remodel?",
        "answer": "Focus on appliances that affect your daily routine and energy costs. Induction cooktops, energy-efficient dishwashers, and counter-depth refrigerators are the most popular upgrades in Connecticut kitchen remodels. We recommend selecting appliances early in the design phase because dimensions affect cabinetry layout. We do not mark up appliance pricing and can coordinate delivery timing with the project schedule."
      },
      {
        "question": "Is it worth adding an island to my kitchen?",
        "answer": "An island adds counter space, storage, and seating, but your kitchen needs at least 36 inches of clearance on all sides (42 inches is recommended). For smaller kitchens, a peninsula or rolling cart may be a better option. Islands with plumbing (sink or dishwasher) or electrical (outlets, cooktop) add to the cost. We evaluate your kitchen dimensions during the consultation and recommend the best layout for your space."
      }
    ]
  },
  {
    "title": "Bathroom Remodeling",
    "items": [
      {
        "question": "What is the difference between a bathroom refresh and a full remodel?",
        "answer": "A bathroom refresh ($15,000 to $25,000) updates fixtures, paint, hardware, and possibly the vanity without changing the layout or opening walls. A full remodel ($25,000 to $55,000 or more) involves demolition down to the studs, new tile, new shower or tub, updated plumbing, electrical work, and often layout changes. We can help you determine which approach makes sense for your goals and budget during the consultation."
      },
      {
        "question": "Can I use my bathroom during the remodel?",
        "answer": "Not the bathroom being remodeled, but we plan the work so you always have access to at least one functioning bathroom in your home. If you have only one bathroom, we discuss logistics during the planning phase and prioritize getting plumbing reconnected as quickly as possible during the build."
      },
      {
        "question": "Are walk-in showers better than tub and shower combos?",
        "answer": "It depends on how you use the space. Walk-in showers with frameless glass are the most popular choice in Connecticut bathroom remodels right now, especially in primary bathrooms. However, if you have young children or plan to sell within a few years, keeping at least one tub in the home is recommended. We can help you evaluate the best option for your household and resale considerations."
      },
      {
        "question": "What tile is best for bathroom floors in Connecticut?",
        "answer": "Porcelain tile is the most popular choice for bathroom floors in Connecticut homes. It is waterproof, extremely durable, and available in a wide range of styles including wood-look and stone-look options. Large-format tiles (12x24 or larger) are trending because they create fewer grout lines and make the space feel larger. Natural stone tile like marble or travertine is also an option but requires regular sealing. We help you choose based on your design preferences, maintenance expectations, and budget."
      },
      {
        "question": "How much does it cost to add a second bathroom?",
        "answer": "Adding a second bathroom in Connecticut typically costs $25,000 to $60,000 depending on the location within the home and whether plumbing access is nearby. Converting a closet or unused space on a floor with existing plumbing is the most cost-effective approach. Adding a bathroom in a basement or an area far from existing plumbing lines increases the cost. The investment typically returns 50 to 60 percent at resale and significantly improves daily livability."
      },
      {
        "question": "What are the most popular bathroom fixture finishes right now?",
        "answer": "Brushed gold, matte black, and brushed nickel are the most requested fixture finishes in Connecticut bathroom remodels. Brushed gold adds warmth and works well with both modern and traditional designs. Matte black provides a clean, contemporary look. Brushed nickel remains a safe, versatile choice. Chrome is less popular than it was a decade ago but still works in certain styles. We recommend choosing one consistent finish throughout the bathroom for a cohesive look."
      },
      {
        "question": "Do I need to upgrade my plumbing during a bathroom remodel?",
        "answer": "It depends on the age and condition of your existing plumbing. In Connecticut homes built before 1960, we often find galvanized steel pipes that should be replaced during a remodel to prevent future leaks and water pressure issues. Homes with original cast iron drain lines may also benefit from replacement. We assess the plumbing condition during the consultation and include any necessary upgrades in the proposal so there are no surprises during construction."
      },
      {
        "question": "Can I expand my bathroom during a remodel?",
        "answer": "Yes. Bathroom expansions are common in Connecticut homes where the original bathrooms are undersized by current standards. Common approaches include borrowing space from an adjacent closet or bedroom, combining a half bath with an adjacent closet to create a full bath, or extending into unused hallway space. Expansion involves structural considerations, updated plumbing runs, and sometimes electrical relocation. We handle all of this in-house."
      },
      {
        "question": "How much does heated bathroom flooring cost in CT?",
        "answer": "Radiant floor heating adds $8 to $15 per square foot to the cost of a bathroom tile installation. For a typical 50 to 80 square foot bathroom, that adds $400 to $1,200 to the project. The system uses electric heating mats installed beneath the tile. It runs on a programmable thermostat and uses very little electricity. Radiant heat is especially popular in Connecticut homes where cold tile floors are uncomfortable during winter months."
      },
      {
        "question": "What is a curbless shower and should I consider one?",
        "answer": "A curbless (zero-threshold) shower has no step to enter. The floor is sloped toward the drain for water containment. Curbless showers create a cleaner, more modern look and are easier to access for all ages and mobility levels. They are especially popular in primary bathroom remodels and aging-in-place projects. The installation requires precise slope work and proper waterproofing, which is included in our standard bathroom remodel process."
      }
    ]
  },
  {
    "title": "Basement Finishing",
    "items": [
      {
        "question": "How do you handle moisture in Connecticut basements?",
        "answer": "Before any finishing work begins, we assess the basement for moisture issues. Connecticut's bedrock geology and seasonal water table fluctuations mean many basements have some moisture exposure. We address this with proper vapor barriers, moisture-resistant insulation, and appropriate flooring materials like luxury vinyl plank or porcelain tile. If there is active water intrusion, we recommend waterproofing remediation before starting the finish work."
      },
      {
        "question": "Do I need an egress window for a finished basement?",
        "answer": "Connecticut building code requires an egress window in any finished basement bedroom. The window must meet specific size requirements for emergency exit. Even if you are not adding a bedroom, an egress window adds natural light and ventilation to the space and increases home value. We handle the full installation, including excavation of the window well, structural framing, and waterproofing around the opening."
      },
      {
        "question": "Can I add a bathroom to my finished basement?",
        "answer": "Yes. Adding a bathroom is one of the most common requests in basement finishing projects. If your home has a sewer connection with adequate depth, we can tie into the existing plumbing. If the sewer line is above the basement floor level, we install an up-flush or sewage ejector pump system. The cost for adding a basement bathroom typically ranges from $15,000 to $30,000 depending on the layout and fixture selections."
      },
      {
        "question": "What ceiling options are available for finished basements?",
        "answer": "The two main options are drywall ceilings and drop (suspended) ceilings. Drywall provides a cleaner, more finished appearance and works well when ceiling height allows. Drop ceilings provide easy access to plumbing, electrical, and HVAC above. They are also easier and less expensive to install. In basements with lower ceiling heights, drywall is often preferred because it saves every inch. We can help you choose based on your ceiling height, access needs, and aesthetic preferences."
      },
      {
        "question": "How much does it cost per square foot to finish a basement in CT?",
        "answer": "Basement finishing in Connecticut costs $30 to $75 per square foot depending on the scope and finish level. Basic finishing with standard materials runs $30 to $45 per square foot. Mid-range projects with upgraded flooring and a bathroom run $45 to $60 per square foot. High-end finishes with custom built-ins, wet bar, and premium materials range from $60 to $75 or more per square foot. These costs include all labor, materials, permits, and inspections."
      },
      {
        "question": "Will finishing my basement increase my home value?",
        "answer": "Yes. A finished basement typically returns 50 to 70 percent of the investment at resale in the Connecticut market. Beyond resale value, a finished basement adds functional living space for your family. It is one of the most cost-effective ways to gain square footage without building an addition. Finished basements with a bathroom and separate entrance tend to deliver the strongest returns."
      },
      {
        "question": "Can I put a kitchen or wet bar in my finished basement?",
        "answer": "Yes. A wet bar or kitchenette is a popular addition to basement finishing projects. A basic wet bar with a sink, mini fridge, and counter typically costs $5,000 to $12,000. A full kitchenette with a range, dishwasher, and more extensive cabinetry runs $15,000 to $25,000 or more. Plumbing access and ventilation for cooking appliances are the main considerations. We plan these additions during the design phase and handle all trade coordination."
      },
      {
        "question": "How do you insulate a basement in Connecticut?",
        "answer": "We typically use rigid foam insulation board against the foundation walls, followed by framing and fiberglass batt insulation in the stud cavities. This approach provides both thermal insulation and a moisture barrier. Spray foam insulation is another option that provides excellent air sealing and moisture resistance, though it costs more. The right approach depends on your foundation type, existing moisture conditions, and budget. All insulation meets Connecticut energy code requirements."
      },
      {
        "question": "Can I create a home office in my finished basement?",
        "answer": "Yes. A dedicated home office is one of the most popular basement finishing requests. The key considerations are adequate lighting (a combination of recessed fixtures and task lighting), sufficient electrical outlets and data connections, and sound management if the space will be used for video calls. An egress window adds natural light and ventilation. We can also build in custom desks, shelving, and storage during the finishing process."
      },
      {
        "question": "What HVAC options work best for finished basements?",
        "answer": "The most common options are extending your existing ductwork, adding a ductless mini-split system, or installing electric baseboard heat. Ductless mini-splits are the most popular choice because they provide both heating and cooling, are energy efficient, and do not require running new ductwork. If your existing HVAC system has the capacity, extending ductwork is the most cost-effective option. We assess your current system during the consultation and recommend the best approach."
      }
    ]
  },
  {
    "title": "Flooring",
    "items": [
      {
        "question": "Should I choose solid hardwood or engineered hardwood?",
        "answer": "Solid hardwood ($12 to $25 per square foot installed) is the traditional choice for living rooms, dining rooms, and bedrooms on the main and upper floors. Engineered hardwood ($8 to $18 per square foot) performs better in basements and areas with moisture exposure because it resists warping from humidity changes. Both can be refinished, though solid hardwood allows for more rounds of sanding over its lifetime. We can show you samples of both during your consultation."
      },
      {
        "question": "Can new flooring be installed over existing floors?",
        "answer": "In many cases, yes. Luxury vinyl plank and engineered hardwood can often be installed directly over existing hard surfaces as long as the subfloor is level and in good condition. However, if the existing floor is damaged, uneven, or if the added height would create issues with door clearances or transitions, removal is the better option. We assess the existing conditions during the consultation and recommend the right approach for your situation."
      },
      {
        "question": "How long does flooring installation take?",
        "answer": "Most flooring installation projects take 2 to 5 days of active work, depending on the square footage and material type. Hardwood installations that require acclimation time may add a few days before work begins. Tile installations take longer due to mortar setting and grouting time. We provide a specific timeline in your proposal, and we move furniture for you as part of the installation process."
      },
      {
        "question": "What is luxury vinyl plank (LVP) and is it a good choice?",
        "answer": "Luxury vinyl plank is a waterproof, durable flooring material that mimics the look of hardwood or stone at a lower price point ($6 to $14 per square foot installed). It is scratch-resistant, comfortable underfoot, and works well in kitchens, bathrooms, basements, and high-traffic areas. Modern LVP products are nearly indistinguishable from real wood. It is our most recommended flooring for basements and for homes with pets or young children."
      },
      {
        "question": "Do you move furniture during flooring installation?",
        "answer": "Yes. We move furniture out of the work area before installation begins and move it back into place after the flooring is complete and ready for use. For whole-home flooring projects, we work room by room so you can continue using parts of your home during the installation. We protect furniture and doorways throughout the process."
      },
      {
        "question": "Can I refinish my existing hardwood floors instead of replacing them?",
        "answer": "In many cases, yes. If your existing hardwood is structurally sound with no major water damage or warping, refinishing is a cost-effective option ($3 to $8 per square foot). The process involves sanding down the existing finish, repairing any damaged boards, and applying new stain and finish coats. Most solid hardwood floors can be refinished 3 to 5 times over their lifetime. We assess the condition of your floors during the consultation and recommend whether refinishing or replacement makes more sense."
      },
      {
        "question": "What flooring is best for homes with pets?",
        "answer": "Luxury vinyl plank is the top choice for homes with pets. It is scratch-resistant, waterproof, and easy to clean. Porcelain tile is another excellent option, especially in entryways and mudrooms. If you prefer hardwood, choose a harder species like hickory or white oak with a matte or wire-brushed finish that helps hide minor scratches. We recommend against softer woods like pine or bamboo in homes with large dogs."
      },
      {
        "question": "How do I choose the right flooring for each room?",
        "answer": "Consider moisture exposure, foot traffic, and how you use the space. Kitchens and bathrooms benefit from waterproof materials like tile or LVP. Living rooms and bedrooms work well with hardwood or engineered hardwood. Basements require moisture-resistant options like LVP or porcelain tile. High-traffic hallways and entryways need durable materials that resist wear. We help you plan a cohesive flooring strategy during the selections phase so materials transition smoothly between rooms."
      },
      {
        "question": "What is the best flooring for kitchens in Connecticut?",
        "answer": "Porcelain tile, luxury vinyl plank, and engineered hardwood are the top choices for Connecticut kitchens. Porcelain tile is waterproof and extremely durable. LVP is comfortable underfoot and handles spills well. Engineered hardwood gives you the warmth of real wood with better moisture resistance than solid hardwood. We do not recommend solid hardwood in kitchens due to the risk of water damage from sinks and dishwashers."
      },
      {
        "question": "How much does it cost to replace flooring in an entire house?",
        "answer": "Whole-home flooring replacement in Connecticut typically costs $15,000 to $50,000 depending on the square footage and material selected. A 2,000 square foot home with luxury vinyl plank runs $12,000 to $28,000 installed. The same home with engineered hardwood costs $20,000 to $36,000. We offer volume pricing on whole-home projects and can phase the work room by room to minimize disruption to your daily routine."
      }
    ]
  },
  {
    "title": "Home Additions",
    "items": [
      {
        "question": "How much does a home addition cost in Connecticut?",
        "answer": "Home additions in Connecticut typically cost $200 to $400 per square foot, depending on the complexity, finishes, and location. A 200 square foot bedroom addition runs $40,000 to $80,000. A two-story addition with a bedroom and bathroom above a family room ranges from $150,000 to $300,000 or more. Costs vary by municipality, site conditions, and the scope of interior finishes."
      },
      {
        "question": "Do I need a permit for a home addition in CT?",
        "answer": "Yes. All home additions in Connecticut require building permits. Zoning approval is also required to confirm the addition meets setback requirements, lot coverage limits, and height restrictions for your property. BuiltWell handles all permit applications, zoning submissions, and inspection coordination as part of the project. We review your property survey and local zoning regulations before design begins."
      },
      {
        "question": "How long does it take to build a home addition?",
        "answer": "A typical home addition in Connecticut takes 3 to 6 months from groundbreaking to completion. Permit approval adds 2 to 6 weeks depending on your municipality. Design and engineering take 4 to 8 weeks before permits are submitted. The total timeline from first meeting to move-in is typically 6 to 10 months. We provide a detailed schedule during the proposal phase."
      },
      {
        "question": "Can I add a second story to my ranch-style home?",
        "answer": "In most cases, yes, but it requires a structural assessment of your existing foundation and framing. Connecticut ranch homes from the 1950s through 1970s often have foundations that can support a second story with proper engineering. The project involves removing the existing roof, building the second-floor structure, and installing a new roof. It is one of the most effective ways to double your living space without expanding your footprint."
      },
      {
        "question": "What types of home additions are most common in CT?",
        "answer": "The most common additions in Connecticut are primary bedroom suites, family room or great room additions, kitchen bump-outs, in-law suites or accessory dwelling units, mudroom and entryway additions, and sunrooms or four-season rooms. In-law suites and ADUs have become increasingly popular as Connecticut municipalities update zoning to allow them."
      },
      {
        "question": "Will a home addition increase my property taxes?",
        "answer": "Yes. Adding square footage to your home increases its assessed value, which will be reflected in your property taxes at the next revaluation or when the building permit triggers a reassessment. The exact impact depends on your town's mill rate and how much value the addition adds. However, the increase in home value and livable space typically far outweighs the additional tax cost."
      },
      {
        "question": "Can I live in my home during a home addition?",
        "answer": "Yes. Most homeowners stay in their home during an addition project. We seal off the construction area from the living space with dust barriers and maintain a safe, clean separation throughout the build. There may be brief periods where water or electrical service is interrupted for tie-in work, but we schedule these in advance and keep disruptions as short as possible."
      },
      {
        "question": "What is the difference between a bump-out and a full addition?",
        "answer": "A bump-out extends an existing room by 2 to 6 feet and does not require a new foundation in most cases. It is a cost-effective way to gain space in a kitchen or bathroom. A full addition is a new room or set of rooms built on a new foundation with its own roof structure. Bump-outs cost $15,000 to $40,000. Full additions start at $40,000 and go up significantly based on size and complexity."
      },
      {
        "question": "How do I know if my lot allows a home addition?",
        "answer": "Your town's zoning regulations determine what you can build. Key factors include setback requirements (how far the structure must be from property lines), maximum lot coverage, height restrictions, and floor area ratio limits. We review your property survey and local zoning code during the planning phase to confirm feasibility before design work begins. If a variance is needed, we can guide you through the application process."
      },
      {
        "question": "Does a home addition need its own HVAC system?",
        "answer": "It depends on the size of the addition and the capacity of your existing system. Small additions and bump-outs can sometimes be served by extending existing ductwork. Larger additions typically need a dedicated HVAC zone or a ductless mini-split system. We assess your existing system's capacity during the planning phase and recommend the most efficient solution. All additions must meet Connecticut energy code requirements for insulation and mechanical systems."
      }
    ]
  },
  {
    "title": "Interior Painting",
    "items": [
      {
        "question": "How much does interior painting cost in Connecticut?",
        "answer": "Interior painting in Connecticut costs $3 to $6 per square foot of wall space, or roughly $2,000 to $5,000 per room depending on size, ceiling height, and prep work needed. A full home interior (2,000 square feet of living space) typically runs $8,000 to $18,000. These prices include premium paint, two coats, proper prep (patching, sanding, priming), and protection of floors and furniture."
      },
      {
        "question": "What paint brands do you use?",
        "answer": "We use Benjamin Moore and Sherwin-Williams exclusively. Both brands offer superior coverage, durability, and color accuracy compared to builder-grade paints. For high-traffic areas, we recommend Benjamin Moore Advance or Sherwin-Williams Emerald for their washability and scuff resistance. We can also work with specialty paints like Farrow and Ball or C2 Paint if you have a specific color or finish preference."
      },
      {
        "question": "How long does it take to paint the interior of a house?",
        "answer": "A single room takes 1 to 2 days including prep, priming, and two coats. A full home interior (3 to 4 bedrooms, living areas, hallways) typically takes 5 to 10 days depending on the scope and condition of existing surfaces. If walls need significant repair, skim coating, or wallpaper removal, add 1 to 3 days. We provide a specific timeline in your proposal."
      },
      {
        "question": "Do I need to move furniture before painting?",
        "answer": "We move furniture to the center of each room and cover it with drop cloths. Large pieces that cannot be easily moved are covered in place. All floors are protected with canvas drop cloths. We handle all prep and cleanup as part of the project. You do not need to prepare the rooms in advance."
      },
      {
        "question": "What paint finish should I choose for different rooms?",
        "answer": "Flat or matte finishes work best for ceilings and low-traffic rooms where you want a smooth, modern look. Eggshell is the most popular choice for living rooms, bedrooms, and dining rooms because it has a subtle sheen and is easy to clean. Satin works well in kitchens, bathrooms, and hallways where moisture and cleaning are more frequent. Semi-gloss is ideal for trim, doors, and cabinetry. We help you choose the right finish for each surface during the color consultation."
      },
      {
        "question": "Can you paint over wallpaper?",
        "answer": "We do not recommend it. Painting over wallpaper often results in bubbling, peeling, and an uneven finish. We remove existing wallpaper, repair the underlying drywall, prime, and then paint. Wallpaper removal adds time and cost to the project, but it ensures a clean, lasting result. If you have multiple layers of old wallpaper, we may recommend skim coating the walls after removal for a perfectly smooth finish."
      },
      {
        "question": "How often should interior walls be repainted?",
        "answer": "With quality paint and proper application, interior walls typically look good for 7 to 10 years in normal conditions. High-traffic areas like hallways, kitchens, and kids' rooms may need repainting sooner. If you are using premium paints like Benjamin Moore Regal or Sherwin-Williams Emerald, the finish holds up longer and cleans more easily, extending the time between repaints."
      },
      {
        "question": "Do you offer color consultation services?",
        "answer": "Yes. We provide color consultation as part of the painting process. We bring large paint samples to your home so you can see how colors look in your actual lighting conditions, which vary significantly from paint store displays. We can also coordinate with your interior designer if you are working with one. Connecticut homes with north-facing rooms, for example, benefit from warmer tones that counteract the cooler natural light."
      },
      {
        "question": "Is there a difference between DIY paint and professional-grade paint?",
        "answer": "Yes. Professional-grade paints from Benjamin Moore and Sherwin-Williams have higher pigment concentrations, better resins, and superior coverage compared to consumer-grade products. They require fewer coats, level more evenly (reducing brush and roller marks), and last significantly longer. The cost difference per gallon is modest compared to the labor savings and the quality of the finished result."
      },
      {
        "question": "Can you paint kitchen cabinets instead of replacing them?",
        "answer": "Yes. Professional cabinet painting is a cost-effective alternative to full cabinet replacement. The process involves removing doors and hardware, cleaning, sanding, priming with a bonding primer, and applying two to three coats of high-adhesion paint (typically Benjamin Moore Advance). The result is a factory-smooth finish that looks like new cabinets. Cabinet painting costs $3,000 to $8,000 depending on the number of cabinets and the kitchen size."
      }
    ]
  },
  {
    "title": "Interior Carpentry",
    "items": [
      {
        "question": "What interior carpentry services do you offer?",
        "answer": "We handle all interior carpentry including crown molding, baseboards, wainscoting, chair rail, built-in shelving and bookcases, custom closet systems, window and door trim, coffered ceilings, shiplap accent walls, staircase renovations, and custom cabinetry. All work is done by our in-house carpenters, not subcontractors."
      },
      {
        "question": "How much does crown molding cost to install in CT?",
        "answer": "Crown molding installation in Connecticut costs $8 to $20 per linear foot installed, depending on the profile size and material. A standard room runs $500 to $1,200. Whole-home crown molding for a 2,000 square foot home typically costs $3,000 to $7,000. MDF and primed pine are the most cost-effective options. Stain-grade hardwood moldings cost more but are preferred in homes with natural wood trim."
      },
      {
        "question": "Can you build custom built-in shelving and bookcases?",
        "answer": "Yes. Custom built-ins are one of our most requested carpentry services. A single built-in bookcase wall typically costs $3,000 to $8,000 depending on size, materials, and complexity. Built-ins around a fireplace, in a home office, or along a living room wall add storage and character while increasing home value. We design, build, and finish everything on-site to ensure a perfect fit."
      },
      {
        "question": "How much does wainscoting cost in Connecticut?",
        "answer": "Wainscoting installation costs $15 to $35 per square foot of wall coverage in Connecticut. A typical dining room or hallway wainscoting project runs $2,000 to $5,000. Raised panel wainscoting costs more than flat panel or beadboard styles. We can match existing trim profiles if you are adding wainscoting to a home that already has architectural details in other rooms."
      },
      {
        "question": "Can you update my staircase with new railings and balusters?",
        "answer": "Yes. Staircase renovations are a high-impact upgrade. Replacing balusters, newel posts, and handrails typically costs $2,000 to $8,000 depending on the length of the staircase and material choices. Iron balusters are the most popular upgrade in Connecticut homes. We can also add wainscoting or shiplap to the stair wall, replace treads and risers, and refinish or paint existing woodwork."
      },
      {
        "question": "What is the difference between MDF and solid wood trim?",
        "answer": "MDF (medium-density fiberboard) trim costs less, paints smoothly, and resists warping. It is ideal for painted trim throughout the home. Solid wood trim (poplar, oak, pine) is preferred for stain-grade applications where you want to see the natural wood grain. Solid wood costs 30 to 50 percent more than MDF. In moisture-prone areas like bathrooms, we recommend PVC or composite trim instead of MDF, which can swell when exposed to moisture."
      },
      {
        "question": "Can you add a coffered ceiling to my dining room?",
        "answer": "Yes. Coffered ceilings add architectural depth and visual interest to any room. Installation costs $15 to $30 per square foot depending on the complexity of the grid pattern and molding profile. A typical dining room runs $3,000 to $6,000. Ceiling height matters — coffered ceilings work best in rooms with 9-foot or higher ceilings. In rooms with 8-foot ceilings, a shallower profile or tray ceiling may be a better alternative."
      },
      {
        "question": "How long does a custom closet build-out take?",
        "answer": "A custom closet build-out takes 3 to 5 days for a standard walk-in closet. The project includes custom shelving, hanging rods, drawers, shoe racks, and finishing. A reach-in closet takes 1 to 2 days. We design the layout based on your wardrobe and storage needs during a planning session. Custom closets typically cost $2,000 to $6,000 for a walk-in and $1,000 to $3,000 for a reach-in."
      },
      {
        "question": "Can you install shiplap or board-and-batten accent walls?",
        "answer": "Yes. Shiplap and board-and-batten are popular accent wall treatments in Connecticut homes. Shiplap installation runs $10 to $20 per square foot. Board-and-batten costs $12 to $25 per square foot. A single accent wall in a bedroom or living room typically costs $1,500 to $3,500 installed and painted. We can also do floor-to-ceiling installations in entryways, mudrooms, and bathrooms."
      },
      {
        "question": "Do you replace interior doors and hardware?",
        "answer": "Yes. Interior door replacement costs $300 to $800 per door installed, depending on the door style and hardware selection. Solid-core doors provide better sound insulation and a more substantial feel than hollow-core doors. We can also replace hinges, handles, and deadbolts across the entire home for a consistent look. Popular finishes include matte black, satin nickel, and oil-rubbed bronze."
      }
    ]
  },
  {
    "title": "Decks & Porches",
    "items": [
      {
        "question": "How much does a new deck cost in Connecticut?",
        "answer": "A new deck in Connecticut costs $40 to $80 per square foot for composite materials and $30 to $50 per square foot for pressure-treated wood. A standard 300 square foot composite deck runs $12,000 to $24,000. Premium materials like Trex Transcend or TimberTech increase the per-square-foot cost. Multi-level decks, built-in seating, and complex railings add to the total. All prices include design, permits, materials, and installation."
      },
      {
        "question": "Should I choose composite decking or wood?",
        "answer": "Composite decking costs more upfront but requires no staining, sealing, or sanding over its lifetime. It resists fading, staining, and mold, which matters in Connecticut's humid climate. Pressure-treated wood costs less initially but requires annual maintenance (staining or sealing) to prevent rot and splintering. Over a 20-year period, composite decking typically costs less when you factor in maintenance. We install both and can help you compare options."
      },
      {
        "question": "Do I need a permit to build a deck in CT?",
        "answer": "Yes. All deck construction in Connecticut requires a building permit. The permit process verifies that the deck meets structural requirements, setback distances, and height regulations. Some towns also require a zoning application if the deck exceeds a certain size or is in a flood zone. We handle all permit applications and inspections as part of the project."
      },
      {
        "question": "How long does deck construction take?",
        "answer": "A standard deck takes 1 to 2 weeks of active construction. Permit approval adds 1 to 3 weeks depending on the municipality. Complex projects with multiple levels, screened sections, or built-in features take 2 to 4 weeks. We build year-round in Connecticut, though spring through fall is the most popular season for deck projects."
      },
      {
        "question": "Can you convert my existing deck to a screened porch?",
        "answer": "Yes. Converting an existing deck to a screened porch involves adding a roof structure, screen panels, and often a new floor surface. The cost typically ranges from $15,000 to $40,000 depending on the size and finish level. We assess the existing deck structure to confirm it can support the added roof load. If the deck framing needs reinforcement, we include that in the proposal."
      },
      {
        "question": "How do I maintain a composite deck?",
        "answer": "Composite decking requires very little maintenance. Clean it twice a year with soap and water or a composite deck cleaner. Remove debris from between boards to prevent moisture buildup. Avoid pressure washing at high settings, which can damage the surface. Unlike wood, composite does not need staining, sealing, or sanding. Most composite decking comes with a 25-year or lifetime warranty against fading, staining, and structural issues."
      },
      {
        "question": "What railing options are available for decks?",
        "answer": "The most popular railing options in Connecticut are composite railings (matching the deck material), aluminum balusters with composite top rails, cable railings for a modern look, and glass panel railings for unobstructed views. Railing costs range from $30 to $100 per linear foot depending on the material and style. Cable and glass railings cost more but provide a cleaner sightline, which is especially popular for decks with views."
      },
      {
        "question": "Can you build a multi-level deck?",
        "answer": "Yes. Multi-level decks are popular on Connecticut homes with sloped yards or walk-out basements. Each level can serve a different purpose — dining, lounging, grilling. Multi-level decks require more structural engineering and materials, so they cost more than single-level builds. A two-level deck with stairs and railings typically costs $25,000 to $50,000 or more depending on size and materials."
      },
      {
        "question": "What is the best deck material for Connecticut weather?",
        "answer": "Composite decking from Trex or TimberTech performs best in Connecticut's climate. It handles freeze-thaw cycles, heavy snow, summer heat, and humidity without warping, cracking, or rotting. PVC decking is another option that is completely moisture-proof. If you prefer natural wood, ipe (Brazilian hardwood) is the most durable option but costs significantly more. Pressure-treated pine is the most affordable but requires regular maintenance to withstand Connecticut winters."
      },
      {
        "question": "Can you add built-in features like benches or planters to my deck?",
        "answer": "Yes. Built-in benches, planters, storage boxes, and pergolas are all common additions. Built-in seating costs $50 to $100 per linear foot. Planters and storage boxes run $500 to $2,000 each depending on size. These features are designed and built as part of the deck structure for a seamless, integrated look. We can also add outdoor lighting, ceiling fans (for covered areas), and electrical outlets."
      }
    ]
  },
  {
    "title": "Attic Conversions",
    "items": [
      {
        "question": "How much does an attic conversion cost in Connecticut?",
        "answer": "Attic conversions in Connecticut typically cost $50,000 to $120,000 depending on the size of the space and the scope of work. A basic conversion with insulation, drywall, flooring, electrical, and lighting runs $50,000 to $75,000. Adding a bathroom increases the cost by $15,000 to $30,000. Dormers to add headroom and natural light add $10,000 to $25,000 each. We assess feasibility during the consultation based on your roof structure and ceiling height."
      },
      {
        "question": "Does my attic have enough ceiling height for a conversion?",
        "answer": "Connecticut building code requires a minimum ceiling height of 7 feet over at least 50 percent of the finished floor area. Many Connecticut homes built in the 1950s through 1980s have attics with sufficient height for conversion. If your attic falls short, dormers can add headroom. We measure and assess your attic during the initial consultation and let you know what is feasible before any commitment."
      },
      {
        "question": "Do I need a permit for an attic conversion in CT?",
        "answer": "Yes. Attic conversions require building permits in all Connecticut municipalities. The permit process verifies structural capacity of existing floor joists, stairway access, egress windows, fire safety, insulation, electrical, and plumbing. BuiltWell handles all permit applications and coordinates every inspection throughout the project."
      },
      {
        "question": "How do you heat and cool a converted attic?",
        "answer": "Ductless mini-split systems are the most popular choice for attic conversions. They provide both heating and cooling, are energy efficient, and do not require running ductwork through the home. A single-zone mini-split for an attic space costs $3,000 to $5,000 installed. Proper insulation (spray foam is recommended for attic conversions) is equally important to maintain comfortable temperatures year-round in Connecticut's climate."
      },
      {
        "question": "Can I add a bathroom to my converted attic?",
        "answer": "Yes. Adding a bathroom to an attic conversion is common and adds significant value. The key consideration is routing plumbing from the attic down through the home. Ideally, the attic bathroom is positioned above or near an existing bathroom on the floor below to minimize plumbing costs. A basic attic bathroom adds $15,000 to $25,000 to the conversion project."
      },
      {
        "question": "Will my existing stairs work for an attic conversion?",
        "answer": "Pull-down attic stairs do not meet building code for a finished living space. A permanent staircase is required. If there is room in the floor plan below (often over a hallway or closet), we can build a standard staircase. If space is tight, a spiral staircase or alternating-tread stair may be an option, though local building codes vary on what is acceptable. We assess stairway options during the feasibility evaluation."
      },
      {
        "question": "How do you insulate an attic conversion?",
        "answer": "Spray foam insulation is the recommended approach for attic conversions. It is applied directly to the underside of the roof deck, creating a conditioned space within the roof envelope. Spray foam provides the highest R-value per inch and eliminates air gaps. It also acts as a vapor barrier. Fiberglass batts between rafters are a less expensive option but provide lower R-value and can leave gaps. All insulation meets Connecticut energy code requirements."
      },
      {
        "question": "Do dormers add value to an attic conversion?",
        "answer": "Yes. Dormers add headroom, natural light, and usable floor space. Shed dormers provide the most added space at the lowest cost per square foot. Gable dormers add architectural character from the exterior. Adding two dormers to an attic conversion typically costs $20,000 to $50,000 and can significantly increase the usable area of the finished space. Dormers also improve ventilation and make the room feel much larger."
      },
      {
        "question": "Can I convert my attic into a home office?",
        "answer": "Yes. Attic home offices are popular because they provide a quiet, separated workspace above the main living areas. Key requirements include adequate electrical (multiple outlets and dedicated circuits for equipment), lighting (a combination of natural and task lighting), and climate control (a mini-split system). We also recommend sound insulation in the floor to reduce noise transmission to the rooms below."
      },
      {
        "question": "How long does an attic conversion take?",
        "answer": "A typical attic conversion takes 6 to 10 weeks of active construction. Permit approval adds 2 to 4 weeks. If dormers are included, add 1 to 2 weeks. The total timeline from initial consultation to completion is typically 3 to 5 months. We provide a detailed schedule in your proposal so you know what to expect at every phase of the project."
      }
    ]
  },
  {
    "title": "Comfort & Accessibility Remodeling",
    "items": [
      {
        "question": "What is aging-in-place remodeling?",
        "answer": "Aging-in-place remodeling adapts your home so you can live safely and comfortably as your needs change over time. Common modifications include zero-threshold showers, grab bars, wider doorways, lever-style door handles, improved lighting, and first-floor bedroom and bathroom access. The goal is to make your home work for you long-term without sacrificing design quality or aesthetics."
      },
      {
        "question": "How much does accessibility remodeling cost in CT?",
        "answer": "Costs vary widely based on scope. Simple modifications like grab bars, lever handles, and improved lighting run $1,000 to $5,000. A curbless shower conversion costs $8,000 to $20,000. Widening doorways runs $500 to $2,000 per opening. A comprehensive first-floor accessibility remodel (bathroom, bedroom, wider hallways, ramp access) can range from $25,000 to $75,000 or more depending on the extent of the modifications."
      },
      {
        "question": "Can you widen doorways for wheelchair access?",
        "answer": "Yes. Standard interior doorways are 28 to 30 inches wide. ADA-recommended clearance is 32 to 36 inches. Widening a doorway involves reframing the opening and installing a wider door. The cost is $500 to $2,000 per doorway depending on whether the wall is load-bearing. Load-bearing walls require a header beam to be installed above the wider opening. We can widen doorways throughout the home as part of a larger accessibility project."
      },
      {
        "question": "What bathroom modifications improve accessibility?",
        "answer": "The most impactful modifications are curbless (zero-threshold) showers, grab bars at the toilet and in the shower, comfort-height toilets (17 to 19 inches), non-slip flooring, lever-style faucet handles, and adequate lighting. A fold-down shower bench or built-in shower seat adds comfort. These modifications can be incorporated into a full bathroom remodel so the space looks beautiful while being fully functional for all ages and mobility levels."
      },
      {
        "question": "Do you install stair lifts or home elevators?",
        "answer": "We coordinate stair lift installations with specialized vendors as part of a larger accessibility project. Stair lifts cost $3,000 to $8,000 for a straight staircase and $10,000 to $15,000 for curved stairs. Home elevators are a larger investment ($20,000 to $50,000 or more) but provide full accessibility between floors. We handle any structural modifications needed for installation, including shaft construction for elevators."
      },
      {
        "question": "Can you add a first-floor bedroom and bathroom?",
        "answer": "Yes. Converting a first-floor room (dining room, den, or office) into a bedroom with an adjacent bathroom is one of the most common aging-in-place projects. The cost depends on whether plumbing already exists nearby and the extent of the modifications. A first-floor bedroom and bathroom conversion typically costs $30,000 to $60,000. This project allows homeowners to live comfortably on one floor without needing to use stairs daily."
      },
      {
        "question": "What kitchen modifications improve accessibility?",
        "answer": "Key kitchen accessibility modifications include pull-out shelves in base cabinets, lowered countertop sections for seated use, lever-style faucet handles, touch-activated or motion-sensor faucets, drawer-style dishwashers and microwaves, improved task lighting under cabinets, and anti-fatigue flooring. We can also install pull-down upper cabinet shelving systems that bring items within easy reach."
      },
      {
        "question": "Are there grants or tax credits for accessibility remodeling in CT?",
        "answer": "Connecticut offers several programs. The Connecticut Home Modification Program provides grants for qualifying homeowners. The federal tax code allows a medical expense deduction for accessibility modifications recommended by a physician. Some municipalities offer property tax relief for accessibility improvements. We can provide documentation of the modifications for your tax advisor. We recommend consulting with a tax professional about your specific situation."
      },
      {
        "question": "Can accessibility modifications be done without looking institutional?",
        "answer": "Absolutely. Modern accessibility products are designed to blend with residential interiors. Grab bars come in decorative finishes that match your fixtures. Curbless showers with frameless glass look luxurious, not clinical. Wider doorways and lever handles are design choices used in high-end homes regardless of accessibility needs. We design every modification to look intentional and attractive, not like an afterthought."
      },
      {
        "question": "What is universal design and how does it apply to remodeling?",
        "answer": "Universal design creates spaces that work for people of all ages and abilities without requiring specialized adaptations later. In remodeling, this means building in features like curbless showers, wider doorways, lever handles, and adequate lighting from the start. These features benefit everyone — parents with strollers, children, adults recovering from injuries, and seniors aging in place. We recommend incorporating universal design principles into any major remodel, even if accessibility is not the primary goal."
      }
    ]
  },
  {
    "title": "Design & Planning",
    "items": [
      {
        "question": "What does the remodeling design process look like?",
        "answer": "Our design process starts with an in-home consultation where we discuss your goals, assess the existing space, and take measurements. We then develop a design concept with layout options, material selections, and a detailed proposal with specific pricing. Once the design is approved, we finalize selections (cabinets, countertops, tile, fixtures, paint colors) before any construction begins. This approach prevents delays and change orders during the build."
      },
      {
        "question": "Do I need an architect for my remodeling project?",
        "answer": "Not always. Minor renovations and cosmetic updates do not require an architect. Projects involving structural changes (removing load-bearing walls, additions, second-story builds) typically require architectural or structural engineering plans for permit approval. We work with licensed architects and structural engineers as needed and include their fees in the project proposal so you have a complete picture of costs upfront."
      },
      {
        "question": "How far in advance should I plan a remodeling project?",
        "answer": "We recommend reaching out 2 to 4 months before you want construction to begin. This allows time for the consultation, design development, material selections, ordering (cabinets can take 8 to 12 weeks), and permit approval. For large projects like additions or whole-home renovations, 4 to 6 months of lead time is ideal. Spring and summer are our busiest seasons, so planning ahead ensures preferred scheduling."
      },
      {
        "question": "What is a design-build firm and why does it matter?",
        "answer": "A design-build firm handles both the design and construction under one contract and one team. This eliminates the disconnect between a separate architect and a separate contractor, which often leads to budget overruns, finger-pointing, and communication gaps. With design-build, your designer and your builder work together from day one. Changes are addressed immediately. Pricing is accurate because the people designing the project are the same people building it."
      },
      {
        "question": "How do you handle material selections?",
        "answer": "We guide you through every selection during the design phase — cabinets, countertops, tile, flooring, fixtures, paint colors, hardware, and lighting. We bring samples to your home so you can see how materials look in your actual lighting. We have preferred vendor relationships that give you access to professional pricing on premium materials. All selections are finalized and ordered before construction begins to prevent delays."
      },
      {
        "question": "Can I make changes after construction has started?",
        "answer": "Changes during construction are possible but can affect timeline and cost. Minor changes like switching a paint color or upgrading a faucet are straightforward. Larger changes like altering the layout or adding scope require a change order with updated pricing and timeline. We invest significant time in the design and planning phase specifically to minimize changes during construction, because that is when changes become expensive."
      },
      {
        "question": "Do you provide 3D renderings of proposed designs?",
        "answer": "Yes, for kitchen and bathroom remodels we can provide 3D renderings so you can visualize the finished space before construction begins. Renderings show cabinet layout, countertop materials, tile patterns, fixture placement, and lighting. This helps you make confident decisions during the selections phase and reduces the likelihood of changes during construction. Renderings are included as part of our design process on qualifying projects."
      },
      {
        "question": "What is included in your project proposal?",
        "answer": "Our proposals are detailed and transparent. They include a complete scope of work, itemized costs broken out by trade (demolition, framing, electrical, plumbing, tile, cabinetry, etc.), material specifications, a projected timeline, payment schedule, warranty information, and all permit and inspection costs. You see exactly where every dollar goes before you commit. We do not use lump-sum pricing that hides the details."
      },
      {
        "question": "How do you communicate during the project?",
        "answer": "You have a dedicated project manager who is your single point of contact throughout the project. We communicate through a combination of in-person site meetings, phone calls, and text updates. You receive regular progress updates including photos. If questions or decisions arise during construction, your project manager reaches out immediately. We are responsive because we know that poor communication is the number one complaint homeowners have about contractors."
      },
      {
        "question": "What happens if unexpected issues are found during demolition?",
        "answer": "It happens. Behind walls, we sometimes find outdated wiring, deteriorated plumbing, water damage, or structural issues that were not visible during the initial assessment. When this occurs, we document the issue with photos, explain the situation, and provide a written change order with the cost to address it before proceeding. We do not make assumptions or add charges without your approval. Transparency in these situations is non-negotiable for us."
      }
    ]
  },
  {
    "title": "Insurance Reconstruction in Connecticut",
    "items": [
      {
        "question": "Does BuiltWell handle insurance reconstruction work?",
        "answer": "Yes, BuiltWell CT (HIC License #0668405) has nearly 15 years of experience rebuilding Connecticut homes after fire, water, storm, and mold damage. We work directly with insurance carriers including State Farm, Liberty Mutual, Allstate, Travelers, and others to rebuild homes to pre-loss condition or better. Our <a href=\"/insurance-restoration/\">insurance reconstruction services</a> include drywall, framing, kitchen and bathroom reconstruction, flooring replacement, interior carpentry, and full interior rebuilds."
      },
      {
        "question": "Can I choose my own contractor for insurance reconstruction?",
        "answer": "Yes, Connecticut law gives homeowners the right to select any licensed contractor for insurance reconstruction. Your insurance company cannot require you to use their preferred vendor. You are entitled to choose a contractor you trust, and the carrier is required to work with them. BuiltWell communicates directly with adjusters and submits supplements as needed to ensure the scope covers what is actually required to <a href=\"/insurance-restoration/\">restore your home</a> correctly."
      },
      {
        "question": "What types of damage does BuiltWell rebuild after?",
        "answer": "BuiltWell rebuilds Connecticut homes after fire damage, water damage, storm damage, and mold damage. Our <a href=\"/insurance-restoration/\">reconstruction scope</a> includes drywall and framing, kitchen reconstruction, bathroom reconstruction, flooring replacement, interior carpentry and trim, and full interior rebuilds. We handle everything from a single room to a complete interior rebuild, and we coordinate directly with your insurance carrier throughout the process."
      },
      {
        "question": "How does the insurance reconstruction process work with BuiltWell?",
        "answer": "The <a href=\"/insurance-restoration/\">insurance reconstruction process</a> begins with a free damage assessment after your claim is filed. We review the damage, prepare a detailed scope of work, and submit it to your insurance adjuster. We communicate directly with the carrier on your behalf, handle any supplements or scope disputes, and begin reconstruction once approval is received. You receive daily updates during construction and a final walkthrough before the project is closed. Our nearly 15 years of experience with carrier requirements means fewer delays and fewer denied line items."
      },
      {
        "question": "Does BuiltWell work with my insurance adjuster directly?",
        "answer": "Yes, BuiltWell communicates directly with your insurance adjuster from the initial scope through project completion. We prepare Xactimate-compatible estimates, document all damage with photos, and submit supplement requests when the initial scope does not cover what is actually needed. Our team has worked with every major carrier in Connecticut -- including State Farm, Liberty Mutual, Allstate, and Travelers -- and understands the documentation and communication standards they require. You should not have to manage that process yourself."
      },
      {
        "question": "How long does insurance reconstruction typically take?",
        "answer": "Insurance reconstruction timelines depend on the scope of damage and carrier approval speed. A single-room rebuild such as a kitchen or bathroom typically takes 3 to 6 weeks once materials are ordered and permits are pulled. A full interior reconstruction can take 8 to 16 weeks. The largest variable is usually how quickly the insurance carrier approves the scope and releases funds. We build the timeline around realistic carrier response times and communicate a detailed schedule to you before work begins."
      },
      {
        "question": "What if the insurance estimate does not cover the full scope of work?",
        "answer": "Initial insurance estimates frequently underestimate the true scope of reconstruction needed. When we identify work that is required but not included in the carrier's estimate, we prepare a detailed supplement with documentation and submit it directly to the adjuster. With nearly 15 years of experience navigating the supplement process, we know how to present the information carriers need to approve additional scope. You are not responsible for the gap unless you choose to add upgrades beyond the pre-loss condition."
      },
      {
        "question": "Can I upgrade materials during insurance reconstruction?",
        "answer": "Yes, homeowners can upgrade materials during <a href=\"/insurance-restoration/\">insurance reconstruction</a> since the home is already being rebuilt. Insurance covers restoration to pre-loss condition, but many Connecticut homeowners choose to upgrade -- for example, from laminate to quartz countertops or from builder-grade cabinets to semi-custom. The carrier covers the cost of replacing to the original standard, and you pay only the difference for the upgrade. We itemize this clearly so you know exactly what the upgrade costs before committing."
      }
    ]
  },
  {
    "title": "Licensing, Compliance and Materials",
    "items": [
      {
        "question": "How do I verify a contractor's license in Connecticut?",
        "answer": "Every home improvement contractor in Connecticut must hold a valid HIC (Home Improvement Contractor) license issued by the Department of Consumer Protection. You can verify any license at <a href=\"https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx\" target=\"_blank\" rel=\"noopener noreferrer\">elicense.ct.gov</a>. BuiltWell holds CT HIC License #0668405. We also carry full general liability insurance and workers' compensation coverage. Never hire a contractor who cannot provide their license number and proof of insurance before work begins."
      },
      {
        "question": "What should a remodeling contract include in Connecticut?",
        "answer": "Connecticut law requires home improvement contracts to include: the contractor's name, address, and HIC license number; a detailed description of the work; the total price and payment schedule; the start and estimated completion dates; and a notice of your right to cancel within three business days. BuiltWell proposals include all of these plus an itemized scope of work, material specifications, and a clear change order process. If a contractor asks for more than one-third of the total cost upfront, that is a red flag under Connecticut regulations."
      },
      {
        "question": "What are the best countertop materials for Connecticut kitchens?",
        "answer": "Quartz and granite are the most popular choices for Connecticut kitchen remodels. Quartz (brands like Cambria, Silestone, and Caesarstone) is non-porous, requires no sealing, and resists staining. Granite offers natural stone character but needs annual sealing. Marble is beautiful but porous and stains easily, making it better suited for bathrooms. For budget-conscious projects, butcher block and laminate have improved significantly in quality and appearance. We help you weigh durability, maintenance, and cost during the selections phase."
      },
      {
        "question": "Does Connecticut require permits for all remodeling work?",
        "answer": "Not all work requires permits, but most remodeling does. Any project involving structural changes, electrical work, plumbing modifications, or HVAC alterations requires a building permit in Connecticut. Cosmetic updates like painting, replacing cabinet hardware, or installing new light fixtures on existing circuits typically do not. Permit requirements vary slightly by town. BuiltWell determines what permits are needed during the planning phase and handles all applications and inspections."
      },
      {
        "question": "What flooring holds up best in Connecticut homes?",
        "answer": "Luxury vinyl plank (LVP) is the top performer for Connecticut basements and high-traffic areas because it is waterproof and handles temperature swings well. Solid hardwood (oak, maple, hickory) remains the preferred choice for main living areas and adds resale value. Engineered hardwood works well in basements and over concrete slabs where moisture is a concern. Tile is ideal for bathrooms and entryways. We recommend specific products based on where the flooring is going, what is underneath it, and how the space is used."
      },
      {
        "question": "How do I protect myself from contractor fraud in Connecticut?",
        "answer": "Verify the contractor's CT HIC license at elicense.ct.gov. Confirm they carry general liability and workers' compensation insurance and ask for certificates. Never pay more than one-third upfront. Get everything in writing with a detailed scope and payment schedule. Avoid contractors who only accept cash, refuse to pull permits, or pressure you into signing immediately. If something goes wrong, file a complaint with the Connecticut Department of Consumer Protection. BuiltWell provides all documentation upfront and welcomes verification."
      }
    ]
  }
];
