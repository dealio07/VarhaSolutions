# Declare pause function
Function pause ($message)
{
    # Check if running Powershell ISE
    if ($psISE)
    {
        Add-Type -AssemblyName System.Windows.Forms
        [System.Windows.Forms.MessageBox]::Show("$message")
    }
    else
    {
        Write-Host "$message" -ForegroundColor Yellow
        $x = $host.ui.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}

# Declare variables
$appPoolName = "VarhaSolutions"
$srcFolder = "D:\Programming\CSharp\projects\VarhaSolutions\HomeSolutions\bin\Release\net5.0\publish\*"
$destFolder = "C:\iisTemp\HomeSolutions\"

# Stop web application pool
if ( (Get-WebAppPoolState -Name "$appPoolName").Value -eq "Stopped" )
{
    Write-Host "AppPool $appPoolName already stopped"
}
else
{
    Write-Host "Shutting down $appPoolName AppPool"
    Write-Host (Get-WebAppPoolState "$appPoolName").Value

    # Signal to stop
    Stop-WebAppPool -Name "$appPoolName"
}
do
{
    Write-Host (Get-WebAppPoolState "$appPoolName").Value
    Start-Sleep -Seconds 1
}
until ( (Get-WebAppPoolState -Name "$appPoolName").Value -eq "Stopped" )

# Copy content
Copy-Item -Force -Recurse -Verbose $srcFolder -Destination $destFolder

# Start web application pool
if ( (Get-WebAppPoolState -Name "$appPoolName").Value -eq "Started" )
{
    Write-Host "AppPool $appPoolName already started"
}
else
{
    Write-Host "Starting $appPoolName AppPool"
    Write-Host (Get-WebAppPoolState "$appPoolName").Value

    # Signal to start
    Start-WebAppPool -Name "$appPoolName"
}

do
{
    Write-Host (Get-WebAppPoolState "$appPoolName").Value
    Start-Sleep -Seconds 1
}
until ( (Get-WebAppPoolState -Name "$appPoolName").Value -eq "Started" )

Write-Host "Done"
