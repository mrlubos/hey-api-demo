import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { findPetsByStatusOptions, addPetMutation, getPetByIdOptions } from './client/@tanstack/react-query.gen'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import type { Pet } from './client/types.gen'

function App() {
  const [petId, setPetId] = useState('')
  const [newPetName, setNewPetName] = useState('')
  const queryClient = useQueryClient()

  // Query to fetch pets by status
  const { data: availablePets, isLoading: isLoadingPets, error: petsError } = useQuery(
    findPetsByStatusOptions({ query: { status: 'available' } })
  )

  // Query to fetch a specific pet by ID
  const { data: specificPet, isLoading: isLoadingPet, refetch: refetchPet } = useQuery({
    ...getPetByIdOptions({ path: { petId: Number(petId) } }),
    enabled: petId !== '' && !isNaN(Number(petId)),
  })

  // Mutation to add a new pet
  const addPet = useMutation({
    ...addPetMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['findPetsByStatus'] })
      setNewPetName('')
    },
  })

  const handleAddPet = () => {
    if (newPetName) {
      addPet.mutate({
        body: {
          name: newPetName,
          status: 'available',
          photoUrls: [],
        } as Pet,
      })
    }
  }

  const handleSearchPet = () => {
    if (petId && !isNaN(Number(petId))) {
      refetchPet()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">PetStore API Demo</h1>
          <p className="text-gray-600">
            Built with @hey-api/openapi-ts, TanStack Query, and Shadcn UI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add New Pet */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Pet</CardTitle>
              <CardDescription>Create a new pet in the store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter pet name"
                value={newPetName}
                onChange={(e) => setNewPetName(e.target.value)}
              />
              <Button 
                onClick={handleAddPet} 
                disabled={addPet.isPending}
                className="w-full"
              >
                {addPet.isPending ? 'Adding...' : 'Add Pet'}
              </Button>
              {addPet.isSuccess && (
                <p className="text-sm text-green-600">Pet added successfully!</p>
              )}
              {addPet.isError && (
                <p className="text-sm text-red-600">Error adding pet</p>
              )}
            </CardContent>
          </Card>

          {/* Find Pet by ID */}
          <Card>
            <CardHeader>
              <CardTitle>Find Pet by ID</CardTitle>
              <CardDescription>Search for a specific pet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter pet ID"
                  value={petId}
                  onChange={(e) => setPetId(e.target.value)}
                />
                <Button onClick={handleSearchPet}>Search</Button>
              </div>
              {isLoadingPet && <p className="text-sm">Loading...</p>}
              {specificPet && (
                <div className="p-4 border border-gray-200 rounded-lg space-y-2">
                  <p className="font-semibold">{specificPet.name}</p>
                  <p className="text-sm text-gray-600">
                    Status: {specificPet.status}
                  </p>
                  {specificPet.category && (
                    <p className="text-sm text-gray-600">
                      Category: {specificPet.category.name}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Available Pets List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Pets</CardTitle>
            <CardDescription>
              Pets currently available in the store
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingPets && <p>Loading pets...</p>}
            {petsError && <p className="text-red-600">Error loading pets</p>}
            {availablePets && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availablePets.slice(0, 12).map((pet: Pet) => (
                  <div
                    key={pet.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold">{pet.name}</h3>
                    <p className="text-sm text-gray-600">ID: {pet.id}</p>
                    {pet.category && (
                      <p className="text-sm text-gray-600">
                        {pet.category.name}
                      </p>
                    )}
                    {pet.tags && pet.tags.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {pet.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
