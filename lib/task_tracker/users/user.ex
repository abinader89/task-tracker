defmodule TaskTracker.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string, unique: true
    field :name, :string, null: false
    field :admin, :boolean
    field :supervisor_id, :integer
    has_one :user, TaskTracker.Users.User, foreign_key: :id, references: :supervisor_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :admin])
    |> validate_required([:name, :email, :admin])
    |> validate_format(:email, ~r/@/)
    |> unique_constraint(:email)
  end

  @doc false
  def changeset(user, attrs, sym) when sym == :set do
    user
    |> cast(attrs, [:supervisor_id])
    |> validate_required([:supervisor_id])
    end
end
