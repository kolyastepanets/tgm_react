class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :longtitude, :latitude

  belongs_to :service
  belongs_to :user
end
