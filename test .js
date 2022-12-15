;[
	{
		$match: {
			product: new ObjectId("639b6279acfc1153c703d65c"),
		},
	},
	{
		$group: {
			_id: null,
			averageRating: {
				$avg: "$rating",
			},
			numOfReviews: {
				$sum: 1,
			},
		},
	},
]
