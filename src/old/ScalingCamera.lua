local Module = {}

local RunService = game:GetService("RunService")
local Workspace = game:GetService("Workspace")
local Camera = Workspace.CurrentCamera

local BackgroundPart = Workspace["Studio Editor"].Background["Background Part"]
local BackgroundGui = BackgroundPart.BackgroundGui

--------
--Variables 1

Module.ActiveViewportSize = UDim2.new(1, 0, 1, 0)
Module.ActiveViewportPosition = UDim2.new(0, 0, 0, -36)
Module.CameraPosition = CFrame.new(0, 0, 0)
Module.FocusArea = Vector2.new(0, 0)
Module.Fit = false

--------
--Variables 2

Module.DistortedPosition = UDim2.new(0, 0, 0, 0)
Module.DistortedSize = UDim2.new(1, 0, 1, 0)

--------
--Computation 1

local function UDim2Absolute(udim2)
	local viewportSize = Camera.ViewportSize
	return Vector2.new(udim2.X.Scale * viewportSize.X + udim2.X.Offset, udim2.Y.Scale * viewportSize.Y + udim2.Y.Offset)
end

local function computeZoomPosition()
	local activeViewportSize = UDim2Absolute(Module.ActiveViewportSize)

	local viewportAspectRatio = activeViewportSize.X / activeViewportSize.Y
	local areaAspectRatio = Module.FocusArea.X / Module.FocusArea.Y

	if Module.Fit and viewportAspectRatio < areaAspectRatio or viewportAspectRatio > areaAspectRatio then
		return Module.CameraPosition * CFrame.new(0, 0, (Module.FocusArea.Y / 2) / math.tan(math.rad(Camera.FieldOfView / 2)))
	else
		return Module.CameraPosition * CFrame.new(0, 0, (0.5 * Module.FocusArea.X / viewportAspectRatio) / math.tan(math.rad(Camera.FieldOfView / 2)))
	end
end

local function computeDistortPositionOffset()
	local viewportDifferenceAverage = (UDim2Absolute(Module.ActiveViewportSize) - Camera.ViewportSize) / 2
	return UDim2Absolute(Module.ActiveViewportPosition) + Vector2.new(0, 36) + viewportDifferenceAverage
end

local function computeDistortSizeScale()
	return UDim2Absolute(Module.ActiveViewportSize).Y / Camera.ViewportSize.Y
end

--------
--Computation 2

function computeDistortPosition()
	local viewSize = Camera.ViewportSize
	local aspectRatio = viewSize.X / viewSize.Y

	local offset = UDim2Absolute(Module.DistortedPosition) + computeDistortPositionOffset()
	local position = offset / viewSize

	local hFactor = math.tan(math.rad(Camera.FieldOfView) / 2)
	local wFactor = hFactor * aspectRatio

	return -position.X * wFactor * 2, position.Y * hFactor * 2
end

function computeDistortSize()
	local size = UDim2Absolute(Module.DistortedSize) * computeDistortSizeScale() / Camera.ViewportSize
	return size.X, size.Y
end

function getDistortOffset()
	local x, y = computeDistortPosition()
	local w, h = computeDistortSize()

	return CFrame.new(
		0, 0, 0,

		w, 0, 0,
		0, h, 0,
		x, y, 1
	)
end

--------
--Computation 3

local function computeViewSize()
	local distortSize = UDim2Absolute(Module.DistortedSize) / Camera.ViewportSize * math.pow(computeDistortSizeScale(), 2)
	return UDim2Absolute(Module.ActiveViewportSize) * (1 / distortSize)
end

--------
--Lock camera

local function changeCamera()
	Camera.CameraType = Enum.CameraType.Scriptable
end
Camera:GetPropertyChangedSignal("CameraType"):Connect(changeCamera)
changeCamera()

--------
--Bind camera to RenderStep

--[[
local function update1()
	Module.ActiveViewportSize = script.Parent.Parent.Size
	Module.ActiveViewportPosition = UDim2.new(0, script.Parent.Parent.AbsolutePosition.X, 0, script.Parent.Parent.AbsolutePosition.Y)
end
local function update2()
	Module.DistortedSize = script.Parent.Size
end
script.Parent.Parent.Changed:Connect(update1)
script.Parent.Changed:Connect(update2)
update1()
update2()
--]]


RunService:BindToRenderStep("ScalingCamera", Enum.RenderPriority.Camera.Value + 1, function()
	Camera.CFrame = computeZoomPosition() * getDistortOffset()
	BackgroundPart.CFrame = Camera.CFrame

	local viewSize = computeViewSize()
	BackgroundGui.Size = UDim2.new(0, viewSize.X % 2 == 0 and viewSize.X or viewSize.X + 1, 0, viewSize.Y % 2 == 0 and viewSize.Y or viewSize.Y + 1)
end)

--[[spawn(function()
	while true do
		wait(2.5)
		game:GetService("TweenService"):Create(script.Parent.Parent, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = UDim2.new(math.random(), 0, math.random(), 0)}):Play()
		wait(2.5)
		game:GetService("TweenService"):Create(script.Parent.Parent, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {Size = UDim2.new(1, 0, 1, 0)}):Play()
	end
end)]]

return Module