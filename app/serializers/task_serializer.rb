class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title

  belongs_to :service
  belongs_to :user
end
