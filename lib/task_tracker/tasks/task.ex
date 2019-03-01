defmodule TaskTracker.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :title, :string
    field :desc, :string
    belongs_to :user, TaskTracker.Users.User
    field :done, :boolean, default: false
    field :time_spent, :integer, default: 0

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :user_id])
    |> validate_required([:title, :desc, :user_id])
  end
end
